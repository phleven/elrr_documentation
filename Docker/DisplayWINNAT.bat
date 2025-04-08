@echo off

rem DISPLAYWINNAT.BAT - DISPLAY WINNAT PORTS (FOR ZOOKEEPER)  

@echo @echo DISPLAYWINNAT.BAT - DISPLAY WINNAT PORTS (FOR ZOOKEEPER)
@echo.

choice /C YN /T 10 /D N /M "Display WINNAT ports? (Y=Yes N=No)"

if errorlevel 255 goto end
if errorlevel 2 goto end
if errorlevel 1 goto run

:run
@echo Display WINNAT ports
netsh int ipv4 show dynamicport tcp

pause

:end