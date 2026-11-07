# Synchro automatique du dossier assistant-fray avec GitHub (Claude Code <-> Cowork)
# Lancée par la tâche Windows « Synchro assistant-fray » (toutes les 15 min et à l'ouverture de session).
# 1. enregistre les modifications locales (Cowork) ; 2. récupère celles de GitHub (Claude Code) ; 3. envoie.
# En cas de conflit : ne choisit jamais une version, annule et affiche une alerte.

$Repo = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$Log  = Join-Path $env:LOCALAPPDATA 'assistant-fray-sync.log'

function Write-Log($m) { "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')  $m" | Add-Content -Path $Log -Encoding UTF8 }
function Show-Alert($m) {
    Write-Log "ALERTE : $m"
    try {
        Add-Type -AssemblyName System.Windows.Forms, System.Drawing
        $n = New-Object System.Windows.Forms.NotifyIcon
        $n.Icon = [System.Drawing.SystemIcons]::Warning
        $n.Visible = $true
        $n.ShowBalloonTip(15000, 'Synchro assistant-fray', $m, 'Warning')
        Start-Sleep -Seconds 16
        $n.Dispose()
    } catch {}
}

# Trouver git : Git pour Windows, sinon celui de GitHub Desktop
$Git = (Get-Command git.exe -ErrorAction SilentlyContinue).Source
if (-not $Git) {
    $Git = Get-ChildItem "$env:LOCALAPPDATA\GitHubDesktop\app-*\resources\app\git\cmd\git.exe" -ErrorAction SilentlyContinue |
           Sort-Object FullName -Descending | Select-Object -First 1 -ExpandProperty FullName
}
if (-not $Git) { Show-Alert "git introuvable : installez Git pour Windows (git-scm.com)."; exit 1 }

Set-Location $Repo
function G {
    $a = $args
    & $Git @a 2>&1 | ForEach-Object { Write-Log "  git $($a[0]) : $_" }
    return $LASTEXITCODE
}

# Opération déjà en cours (conflit non réglé) : ne rien toucher
if ((Test-Path '.git\MERGE_HEAD') -or (Test-Path '.git\rebase-merge') -or (Test-Path '.git\rebase-apply')) {
    Show-Alert "Conflit en attente dans assistant-fray. Ouvrez GitHub Desktop et demandez à Claude."
    exit 1
}

$branch = (& $Git rev-parse --abbrev-ref HEAD).Trim()
if ($branch -ne 'main') { Write-Log "Branche $branch (pas main) : synchro ignorée."; exit 0 }

# 1. Enregistrer les modifications locales
G add -A | Out-Null
& $Git diff --cached --quiet
if ($LASTEXITCODE -ne 0) {
    $msg = "Cowork : synchro automatique du $(Get-Date -Format 'dd/MM/yyyy HH:mm')"
    if ((G commit -m $msg) -ne 0) { Show-Alert "Enregistrement local impossible (voir le journal)."; exit 1 }
    Write-Log "Modifications locales enregistrées."
}

# 2. Récupérer GitHub
if ((G pull --rebase origin main) -ne 0) {
    G rebase --abort | Out-Null
    Show-Alert "Conflit entre Cowork et Claude Code sur un même fichier. Rien n'a été écrasé. Demandez à Claude de trancher avec vous."
    exit 1
}

# 3. Envoyer
$ahead = [int]((& $Git rev-list --count origin/main..HEAD) | Select-Object -First 1)
if ($ahead -gt 0) {
    if ((G push origin main) -ne 0) { Show-Alert "Envoi vers GitHub impossible (connexion ou identifiants)."; exit 1 }
    Write-Log "$ahead modification(s) envoyée(s) sur GitHub."
} else {
    Write-Log "A jour."
}
exit 0
