@echo off
set cp=%cd%

cd ../../

for /r %cd% %%a in (*.source.js) do (
     %cp%\compiler\compiler.cmd %%a
)
