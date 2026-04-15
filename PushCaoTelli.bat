@echo off
title CãoTelli — Enviando para o GitHub
echo.
echo   Enviando site CãoTelli para o GitHub...
echo   ------------------------------------------
echo.

cd /d "%~dp0"

:: Remove locks se existirem
del /f /q ".git\index.lock" 2>nul
del /f /q ".git\config.lock" 2>nul

:: Configura identidade
git config user.email "liezerlad21@gmail.com"
git config user.name "Liezer"

:: Adiciona remote se nao existir
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    git remote add origin https://github.com/liezerlad21-commits/CaoTelli.git
    echo   Remote configurado.
)

:: Renomeia branch para main se necessario
git branch -m master main 2>nul

:: Adiciona e commita todas as mudancas
git add -A
git commit -m "Atualizacao do site CaoTelli" 2>nul

:: Envia para o GitHub
git push -u origin main --force

echo.
if %errorlevel%==0 (
    echo   =============================================
    echo   Enviado com sucesso!
    echo   Acesse: github.com/liezerlad21-commits/CaoTelli
    echo   =============================================
) else (
    echo   Erro ao enviar. Verifique sua conexao com a internet.
    echo   Lembre-se de criar o repositorio no GitHub primeiro:
    echo   github.com/new  (nome: CaoTelli)
)
echo.
pause
