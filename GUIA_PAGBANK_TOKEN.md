# 🔑 Guia: Gerando Token PagBank para CãoTelli

## 📌 O que é Token?
É uma "chave de acesso" que permite o site gerar pagamentos PIX automaticamente no PagBank.

---

## 🧪 FASE 1: Token de TESTE (agora)
**Serve para:** Testar tudo funcionando antes de ganhar dinheiro de verdade.

### Passos:
1. Ir para **https://pagseguro.uol.com.br** e fazer login
2. No painel, procurar por:
   - **Configurações** (ou ⚙️) → **Integração** → **Tokens de API**
3. Clicar em **"Gerar novo token"**
4. Escolher: **Ambiente de Testes (Sandbox)**
5. Dar um nome: ex. "CãoTelli Site Teste"
6. Copiar o token inteiro (é uma sequência longa de caracteres)
   - ⚠️ **Importante:** O token aparece SÓ UMA VEZ! Se fechar, gera novo!

### Token de Teste parece assim:
```
18285bc1-e0ba-4c7f-b35f-0f79085c020e50fc9ee640cabc1ac9b784e6149d9a310329-3e2d-4c0b-93ab-0fbf9e4d9ae8
```

### Onde colocar:
- Liézer entra em: **https://vercel.com** → projeto `cao-telli`
- **Settings** → **Environment Variables**
- Cria uma variável: `PAGBANK_TOKEN` = [token que você copiou]
- Clica em **Save**

---

## 💰 FASE 2: Token de PRODUÇÃO (depois, quando estiver 100% pronto)
**Serve para:** Receber dinheiro de VERDADE! 💵

### Passos (IGUAIS à Fase 1, MAS):
1. Mesmo local: **Configurações** → **Integração** → **Tokens de API**
2. Clicar em **"Gerar novo token"**
3. **⭐ AGORA:** Escolher **Ambiente de Produção (ao invés de Testes)**
4. Dar um nome: ex. "CãoTelli Site Produção"
5. Copiar e guardar em lugar seguro!

### Token de Produção parece assim:
```
prod_xxxxxx... (começa com "prod_")
```

### Onde colocar:
- Mesmo lugar que antes, MAS agora em `PAGBANK_TOKEN` da aba **Production**

---

## ⚠️ Problemas comuns:

| Problema | Solução |
|----------|---------|
| "Não encontro Tokens de API" | Procure em **Configurações** → **Integração** → **Tokens** (o nome pode variar) |
| "Não vejo a opção Sandbox" | Alguns painéis mostram como **"Ambiente de Testes"** ou **"Teste"** |
| "O token não funciona" | Copie completo, sem espaços no início/fim |
| "Gerou token mas expirou rápido" | Tokens de teste do PagBank expiram após ~3 meses de inatividade |
| "Preciso gerar outro token" | Sem problema! Pode gerar quantos quiser |

---

## 🚀 Quando o token estiver 100% funcional:
Me avisa que eu descomento a integração real no código e o PIX começa a funcionar de verdade! 🎉

---

**Próximas ações:**
1. ✅ Amanhã: Gerar token de TESTE com o Diogo
2. ✅ Colocar na Vercel
3. ✅ Testar o fluxo (adicionar produtos → checkout → PIX)
4. ✅ Se funcionar: Pronto para ir ao vivo!
5. ✅ Depois: Gerar token de PRODUÇÃO e ativar o dinheiro de verdade

---

**Dúvidas?** É só chamar! 🐾
