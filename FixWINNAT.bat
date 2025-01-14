@echo off

rem FIXWINNAT.BAT - FIX WINNAT (FOR ZOOKEEPER)  

@echo @echo FIXWINNAT.BAT - FIX WINNAT (FOR ZOOKEEPER)
@echo.

choice /C YN /T 10 /D N /M "Fix WINNAT? (Y=Yes N=No)"

if errorlevel 255 goto end
if errorlevel 2 goto end
if errorlevel 1 goto run

:run
@echo Fix WINNAT
netsh int ipv4 set dynamic tcp start=49152 num=16384
netsh int ipv4 show dynamicport tcp

pause

:end