@echo off
REM =====================================
REM    Closure Compiler CMD Script
REM
REM     - by yubo@taobao.com
REM     - 2009-11-10
REM =====================================
SETLOCAL ENABLEEXTENSIONS

echo.
echo Google Closure Compiler build 20091113

REM 过滤文件后缀，只压缩 js
if "%~x1" NEQ ".js" (
    echo.
    echo **** 请选择 JS 文件
    echo  %~f1
    echo.
    goto End
)

REM 检查Java环境
if "%JAVA_HOME%" == "" goto NoJavaHome
if not exist "%JAVA_HOME%\bin\java.exe" goto NoJavaHome
if not exist "%JAVA_HOME%\bin\native2ascii.exe" goto NoJavaHome

REM 生成压缩后的文件名，规则为：
REM 1. 文件名有.source时: filename.source.js -> filename.js
REM 2. 其它情况：filename.js -> filename-min.js
set RESULT_FILE=%~p1%~n1-min%~x1
dir /b "%~f1" | find ".source." > nul
if %ERRORLEVEL% == 0 (
    for %%a in ("%~n1") do (
        REM set RESULT_FILE=%%~na%~x1 //原来只输出到当前环境
        set RESULT_FILE=%~p1%%~na%~x1
    )
)


REM compile.jar
REM "%JAVA_HOME%\bin\java.exe" -jar "%~dp0compiler.jar"  --js "%~nx1" --js_output_file "%RESULT_FILE%" //原来也只压缩当前环境下的
"%JAVA_HOME%\bin\java.exe" -jar "%~dp0compiler.jar"  --js "%~f1" --js_output_file "%RESULT_FILE%"


REM print result
if %ERRORLEVEL% == 0 (
    echo.
    echo 压缩文件 %~nx1 到 %RESULT_FILE%
    for %%a in ("%RESULT_FILE%") do (
        echo 文件大小从 %~z1 bytes 压缩到 %%~za bytes
    )
    echo.
) else (
    echo.
    if "%~2" NEQ "" (
         echo **** 文件 %~nx1 中有写法错误，请仔细检查 >> %~nx1.ex    
    ) else (
         echo **** 文件 %~nx1 中有写法错误，请仔细检查
         pause
    )
    echo.
	goto End
)
goto End

:NoJavaHome
echo.
echo **** 请先安装 JDK 并设置 JAVA_HOME 环境变量
echo.

:End
ENDLOCAL
if "%~2" NEQ "true" (
   ping /n 1 /w 10 1.0.0.1>nul 
) else (
   pause
)
