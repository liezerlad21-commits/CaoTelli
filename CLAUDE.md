# Projeto CãoTelli PetShop

> **Leia `HISTORICO_PROJETO.md` PRIMEIRO.** Ele contém todo o contexto do projeto: o que foi feito, arquitetura, decisões de design e onde paramos na última sessão. Sem ler, você não tem como continuar de onde parou.

---

## Contexto rápido

- **Cliente:** CãoTelli — Rações e Acessórios (Canoas/RS)
- **Desenvolvedor:** Liézer (TCC de 200h — e-commerce real)
- **Arquitetura:** SPA puro (HTML + CSS + JS em um único `index.html`). Sem frameworks, sem build.
- **Hospedagem:** GitHub Pages — `https://liezerlad21-commits.github.io/CaoTelli/`
- **Backend:** Vercel (`cao-telli.vercel.app`) — API PIX/Cartão via Mercado Pago
- **Banco:** Firebase (Auth + Firestore)
- **Domínio próprio (em transição):** `caotelli.com.br`

## Estrutura

```
CaoTelli/
├── index.html                          ← site inteiro (SPA em arquivo único, ~600KB)
├── img/categorias/                     ← 11 imagens custom das categorias
├── logo_caotelli.png                   ← logo principal
├── PushCaoTelli.bat                    ← script pra commit/push rápido
├── HISTORICO_PROJETO.md                ← histórico completo (LEIA PRIMEIRO)
├── Documentacao_Projeto_CaoTelli.docx  ← documentação acadêmica do TCC
└── api/                                ← funções serverless Vercel (PIX/cartão/webhook)
```

## Fluxo de trabalho

1. **Sempre leia `HISTORICO_PROJETO.md`** antes de qualquer alteração — especialmente as seções:
   - **Seção 5** — Funcionalidades já implementadas
   - **Seção 7** — Próximos passos (backlog priorizado)
   - **Seção 9** — Onde paramos (sessão mais recente)

2. **Ao fazer alterações:** edite direto no `index.html` (é onde tudo mora).

3. **Ao encerrar a sessão:** o Liézer vai pedir *"atualiza o histórico com o que fizemos hoje"* — atualize o `HISTORICO_PROJETO.md` adicionando uma nova seção com data, mudanças e status.

4. **Push:** o Liézer roda `PushCaoTelli.bat` manualmente pra subir pro GitHub — não precisa se preocupar com git.

## Padrões a respeitar

- **Paleta:** `--primary-cyan: #0088C2` (azul) + `--primary-purple: #D6324A` (vermelho/magenta)
- **Fonte da marca:** `Dancing Script` (Google Fonts)
- **Ícones:** Font Awesome 6.5.0
- **Persistência local:** `localStorage` (chaves prefixadas com `caotelli_`)
- **Sem dependências pesadas:** só Google Fonts e Font Awesome via CDN
- **Responsivo:** desktop, tablet, mobile (breakpoints inline no `<style>`)

## Comandos úteis pro Liézer

- **Retomar contexto:** *"leia o histórico e me diga onde paramos"*
- **Encerrar sessão:** *"atualiza o histórico com o que fizemos hoje"*
- **Deploy:** rodar `PushCaoTelli.bat` (Liézer faz isso, não Claude)

---

**⚠️ Importante:** este projeto tem cliente real (Diogo, dono da CãoTelli) e já rodou pagamentos em produção. Toda mudança precisa ser testada mentalmente antes de subir. Se quebrar o `index.html`, o site vai ao ar quebrado.
