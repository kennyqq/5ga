@echo off
setlocal enabledelayedexpansion

set "PORT=4173"
set "FOUND=0"

for /f "tokens=5" %%P in ('netstat -ano ^| findstr /R /C:":%PORT% .*LISTENING"') do (
  set "FOUND=1"
  echo Closing demo server PID %%P on port %PORT%...
  taskkill /PID %%P /F >nul 2>&1
)

if "!FOUND!"=="0" (
  echo No demo server found on port %PORT%.
) else (
  echo Demo server on port %PORT% has been closed.
)

endlocal
