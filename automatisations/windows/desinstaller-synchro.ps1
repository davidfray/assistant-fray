# Supprime la tâche « Synchro assistant-fray ». Clic droit > « Exécuter avec PowerShell ».
Unregister-ScheduledTask -TaskName 'Synchro assistant-fray' -Confirm:$false -ErrorAction SilentlyContinue
Write-Host 'Tâche supprimée.' -ForegroundColor Green
Read-Host 'Appuyez sur Entrée pour fermer'
