@echo off
title CãoTelli — Corrigindo e enviando...
echo.
echo   Removendo lock e enviando para o GitHub...
echo   ------------------------------------------
echo.

cd /d "%~dp0"

:: Remove locks
del /f /q ".git\index.lock" 2>nul
del /f /q ".git\config.lock" 2>nul
del /f /q ".git\HEAD.lock" 2>nul

:: Configura identidade
git config user.email "liezerlad21@gmail.com"
git config user.name "Liezer"

:: Commita e envia
git add -A
git commit -m "feat: esqueci senha e exclusao de clientes no admin"
git push -u origin main --force

echo.
if %errorlevel%==0 (
    echo   =============================================
    echo   Enviado com sucesso!
    echo   Acesse: github.com/liezerlad21-commits/CaoTelli
    echo   =============================================
) else (
    echo   Algo deu errado. Verifique acima.
)
echo.
pause
