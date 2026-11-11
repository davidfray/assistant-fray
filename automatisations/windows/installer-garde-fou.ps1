# Installe Claude Code (si besoin) et le mod « fray-garde-fou » pour toutes les sessions Claude Code du PC.
# À lancer une seule fois : double-clic sur installer-garde-fou.cmd (dans le même dossier).

$ErrorActionPreference = 'Stop'
$Mod = (Resolve-Path (Join-Path $PSScriptRoot '..\mods\fray-garde-fou')).Path
$Bin = Join-Path $env:USERPROFILE '.local\bin'

function Trouver-Claude {
    $c = Get-Command claude -ErrorAction SilentlyContinue
    if ($c) { return $c.Source }
    $exe = Join-Path $Bin 'claude.exe'
    if (Test-Path $exe) { return $exe }
    return $null
}

Write-Host ''
Write-Host '1/3  Claude Code en ligne de commande' -ForegroundColor Cyan
$Claude = Trouver-Claude
if (-not $Claude) {
    Write-Host '     Absent : installation officielle depuis claude.ai...'
    Invoke-RestMethod https://claude.ai/install.ps1 | Invoke-Expression
    $env:Path = "$Bin;$env:Path"
    $Claude = Trouver-Claude
    if (-not $Claude) { throw "Claude Code ne s'est pas installé. Envoyez une capture de cette fenêtre à Claude." }
    # Ajout permanent au PATH de l'utilisateur, pour que « claude » marche dans tout nouveau terminal.
    $PathUser = [Environment]::GetEnvironmentVariable('Path', 'User')
    if (($PathUser -split ';') -notcontains $Bin) {
        [Environment]::SetEnvironmentVariable('Path', ($(if ($PathUser) { "$PathUser;$Bin" } else { $Bin })), 'User')
    }
}
Write-Host "     OK : $Claude" -ForegroundColor Green
& $Claude --version

Write-Host ''
Write-Host '2/3  Installation du mod fray-garde-fou (niveau utilisateur)' -ForegroundColor Cyan
Write-Host "     Dossier : $Mod"
& $Claude plugin install fray-garde-fou --marketplace $Mod --scope user

Write-Host ''
Write-Host '3/3  Vérification' -ForegroundColor Cyan
& $Claude plugin list

Write-Host ''
Write-Host 'Terminé. Le mod est actif dans chaque nouvelle session Claude Code du PC' -ForegroundColor Green
Write-Host '(bande « garde-fou actif » au-dessus de la zone de saisie).' -ForegroundColor Green
Write-Host 'Si Claude Code vient d''être installé : lancez « claude » une fois pour vous connecter.' -ForegroundColor Yellow
Write-Host ''
Read-Host 'Appuyez sur Entrée pour fermer'
