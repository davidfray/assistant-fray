# Installe la tâche Windows « Synchro assistant-fray » (à lancer une seule fois).
# Clic droit sur ce fichier > « Exécuter avec PowerShell ».

$Script = Join-Path $PSScriptRoot 'sync-assistant-fray.ps1'
$Arg = "-NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File `"$Script`""

$Action   = New-ScheduledTaskAction -Execute 'powershell.exe' -Argument $Arg
$AtLogon  = New-ScheduledTaskTrigger -AtLogOn -User "$env:USERDOMAIN\$env:USERNAME"
$Every15  = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(1) -RepetitionInterval (New-TimeSpan -Minutes 15)
$Settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -MultipleInstances IgnoreNew -ExecutionTimeLimit (New-TimeSpan -Minutes 10)

Register-ScheduledTask -TaskName 'Synchro assistant-fray' -Action $Action -Trigger $AtLogon, $Every15 -Settings $Settings `
    -Description 'Synchronise le dossier assistant-fray avec GitHub toutes les 15 minutes (Claude Code et Cowork).' -Force | Out-Null

Write-Host ''
Write-Host 'Tâche « Synchro assistant-fray » installée (toutes les 15 min et à chaque ouverture de session).' -ForegroundColor Green
Write-Host 'Premier essai maintenant. Si GitHub demande de vous connecter, acceptez.' -ForegroundColor Yellow
Write-Host ''
& powershell.exe -NoProfile -ExecutionPolicy Bypass -File $Script
Write-Host ''
Write-Host "Journal : $env:LOCALAPPDATA\assistant-fray-sync.log"
Get-Content "$env:LOCALAPPDATA\assistant-fray-sync.log" -Tail 8 -ErrorAction SilentlyContinue
Write-Host ''
Read-Host 'Appuyez sur Entrée pour fermer'
