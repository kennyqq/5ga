@echo off
setlocal

cd /d "%~dp0"

set "PORT=4173"
set "URL=http://127.0.0.1:%PORT%"

for /f "tokens=5" %%P in ('netstat -ano ^| findstr /R /C:":%PORT% .*LISTENING"') do (
  goto :open_browser
)

echo Building demo...
call npm.cmd run build
if errorlevel 1 (
  echo Build failed. Please check the terminal output.
  pause
  exit /b 1
)

echo Starting preview server on port %PORT%...
start "5GA700 Demo Preview" /min cmd /c "cd /d ""%~dp0"" && npm.cmd run preview -- --host 127.0.0.1 --port %PORT%"

powershell -NoProfile -ExecutionPolicy Bypass -Command "$deadline=(Get-Date).AddSeconds(30); while((Get-Date) -lt $deadline){ try { $resp = Invoke-WebRequest '%URL%' -UseBasicParsing; if ($resp.StatusCode -ge 200) { exit 0 } } catch { }; Start-Sleep -Milliseconds 500 }; exit 1"
if errorlevel 1 (
  echo Preview server did not start in time.
  pause
  exit /b 1
)

:open_browser
start "" "%URL%"
echo Demo opened: %URL%

endlocal
