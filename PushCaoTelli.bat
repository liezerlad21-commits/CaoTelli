@echo off
chcp 65001 >nul
title CaoTelli - Push para o GitHub
echo.
echo   ============================================
echo     Enviando site CaoTelli para o GitHub
echo   ============================================
echo.

cd /d "%~dp0"

:: 1) Remove locks se existirem (evita erro entre sandbox e Windows)
del /f /q ".git\index.lock" 2>nul
del /f /q ".git\config.lock" 2>nul
del /f /q ".git\HEAD.lock" 2>nul

:: 2) Configura identidade
git config user.email "liezerlad21@gmail.com"
git config user.name "Liezer"

:: 3) Garante que o remote esta configurado
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    git remote add origin https://github.com/liezerlad21-commits/CaoTelli.git
    echo   Remote configurado.
)

:: 4) Garante branch main
git branch -m master main 2>nul

:: 5) Pergunta a mensagem do commit (Enter usa mensagem generica)
echo.
set /p COMMIT_MSG=  Mensagem do commit (Enter = generica):
if "%COMMIT_MSG%"=="" set COMMIT_MSG=Atualizacao do site CaoTelli

:: 6) Adiciona, comita e da push
git add -A
git commit -m "%COMMIT_MSG%" 2>nul
if %errorlevel% neq 0 (
    echo.
    echo   Nada novo pra comitar - pulando commit.
)

echo.
echo   Enviando para o GitHub...
git push -u origin main

echo.
if %errorlevel%==0 (
    echo   ============================================
    echo     Enviado com sucesso!
    echo     Site: liezerlad21-commits.github.io/CaoTelli
    echo     Vercel: cao-telli.vercel.app
    echo   ============================================
) else (
    echo   ============================================
    echo     Erro ao enviar. Verifique:
    echo     - Conexao com internet
    echo     - Se o repo existe: github.com/liezerlad21-commits/CaoTelli
    echo     - Se voce esta logado no Git (git config)
    echo   ============================================
)
echo.
pause
