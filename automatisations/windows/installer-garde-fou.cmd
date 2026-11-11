@echo off
rem Double-clic : installe Claude Code (si besoin) et le mod fray-garde-fou.
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0installer-garde-fou.ps1"
if errorlevel 1 pause
