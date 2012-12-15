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

REM �����ļ���׺��ֻѹ�� js
if "%~x1" NEQ ".js" (
    echo.
    echo **** ��ѡ�� JS �ļ�
    echo  %~f1
    echo.
    goto End
)

REM ���Java����
if "%JAVA_HOME%" == "" goto NoJavaHome
if not exist "%JAVA_HOME%\bin\java.exe" goto NoJavaHome
if not exist "%JAVA_HOME%\bin\native2ascii.exe" goto NoJavaHome

REM ����ѹ������ļ���������Ϊ��
REM 1. �ļ�����.sourceʱ: filename.source.js -> filename.js
REM 2. ���������filename.js -> filename-min.js
set RESULT_FILE=%~p1%~n1-min%~x1
dir /b "%~f1" | find ".source." > nul
if %ERRORLEVEL% == 0 (
    for %%a in ("%~n1") do (
        REM set RESULT_FILE=%%~na%~x1 //ԭ��ֻ�������ǰ����
        set RESULT_FILE=%~p1%%~na%~x1
    )
)


REM compile.jar
REM "%JAVA_HOME%\bin\java.exe" -jar "%~dp0compiler.jar"  --js "%~nx1" --js_output_file "%RESULT_FILE%" //ԭ��Ҳֻѹ����ǰ�����µ�
"%JAVA_HOME%\bin\java.exe" -jar "%~dp0compiler.jar"  --js "%~f1" --js_output_file "%RESULT_FILE%"


REM print result
if %ERRORLEVEL% == 0 (
    echo.
    echo ѹ���ļ� %~nx1 �� %RESULT_FILE%
    for %%a in ("%RESULT_FILE%") do (
        echo �ļ���С�� %~z1 bytes ѹ���� %%~za bytes
    )
    echo.
) else (
    echo.
    if "%~2" NEQ "" (
         echo **** �ļ� %~nx1 ����д����������ϸ��� >> %~nx1.ex    
    ) else (
         echo **** �ļ� %~nx1 ����д����������ϸ���
         pause
    )
    echo.
	goto End
)
goto End

:NoJavaHome
echo.
echo **** ���Ȱ�װ JDK ������ JAVA_HOME ��������
echo.

:End
ENDLOCAL
if "%~2" NEQ "true" (
   ping /n 1 /w 10 1.0.0.1>nul 
) else (
   pause
)
