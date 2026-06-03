# CHANGELOG — Site CãoTelli PetShop

> Registro legível de todas as alterações feitas no projeto.
> Cada entrada aponta para o commit Git correspondente, permitindo reverter para qualquer ponto com `git checkout <hash> -- index.html`.

---

## Como ler este arquivo

- Formato: data (mais recente no topo) → lista de alterações → hash do commit.
- Para voltar a um ponto anterior: copie o hash (ex.: `a1b2c3d`) e peça "volta o site pro commit a1b2c3d".
- Para ver a diferença entre dois pontos: `git diff <hash1> <hash2> -- index.html`.

---

## 17/04/2026 — SEO, Footer, Validações e Cadastro de Pets — commit `bfeff66`

- SEO completo no `index.html`: meta description, keywords, Open Graph, Twitter Card, favicon, canonical URL com domínio correto (`liezerlad21-commits.github.io/CaoTelli`)
- Criados `sitemap.xml` e `robots.txt`
- Footer reformulado com textos reais da loja e modais funcionais para: Sobre, Privacidade, Termos de Uso, Trocas, Frete, Central de Ajuda, Fale Conosco, Trabalhe Conosco e FAQ
- Termos de Uso completos (12 artigos do PDF) integrados no modal
- "Rastrear Pedido" removido do footer
- Links de WhatsApp com mensagens pré-preenchidas em Trocas e Central de Ajuda
- Cadastro de clientes: telefone agora obrigatório, seção de pets reformulada com suporte a múltiplos pets, tipo (Cão/Gato/Outros) e lista de raças por tipo
- Validações: máscara automática de telefone `(51) 99999-9999`, máscara de CPF `000.000.000-00`, bloqueio de datas passadas no agendamento
- Hospedagem corrigida no histórico: GitHub Pages (não mais Netlify)
- Copyright atualizado para 2026

---

## 17/04/2026 — SEO

- Atualizado `<title>` com palavras-chave locais (Canoas/RS).
- Adicionadas meta tags: `description`, `keywords`, `robots`, `canonical`.
- Adicionadas tags Open Graph completas para link bonito no WhatsApp/Facebook.
- Adicionado Twitter Card.
- Adicionados favicon e apple-touch-icon.
- Criado `sitemap.xml` na raiz.
- Criado `robots.txt` na raiz.
- Confirmado: carrinho já estava persistido no localStorage (item 3 do backlog concluído).

---

## 16/04/2026 — Sessão de organização

- Criado `HISTORICO_PROJETO.md` com contexto completo do projeto (visão geral, estrutura, funcionalidades, backlog).
- Criado este `CHANGELOG.md` como índice legível de alterações.
- Commit checkpoint com todos os arquivos novos: **commit `c2f03f0`**.
- Também subiram nesse mesmo commit: `Carta_de_Apresentacao_CaoTelli.docx` e `Ficha_de_Frequencia_CaoTelli.docx`.
- **Foco acordado:** trabalhar apenas no site (deixar TaskForge e documentação de lado).
- **Próxima ação:** escolher item do backlog para atacar.

---

## Histórico anterior (pré-CHANGELOG)

Commits já feitos via Git antes da criação deste arquivo:

| Hash | Descrição |
|---|---|
| `9579aab` | Melhora botão cancelar no modal Pix |
| `ae05318` | Atualização do site CaoTelli |
| `6c5b5d5` | Atualização do site CaoTelli |
| `279cab4` | Atualização do site CaoTelli |
| `eb4115f` | Atualização do site CaoTelli |
| `20fb551` | Atualização do site CaoTelli |
| `fe14587` | Atualização do site CaoTelli |
| `21c9df6` | Atualização do site CaoTelli |
| `f64938a` | Atualização do site CaoTelli |
| `c59c695` | Atualização do site CaoTelli |
| `2411c75` | Atualização do site CaoTelli |
| `f132b8b` | Atualização do site CaoTelli |
| `27bdd53` | Atualização do site CaoTelli |
| `5e34579` | Atualização do site CaoTelli |
| `64af40d` | Atualização do site CaoTelli |
| `188082d` | Atualização do site CaoTelli |
| `fd0cac7` | Atualização do site CaoTelli |
| `b2d20bd` | Atualização do site CaoTelli |
| `522f5b0` | Atualização do site CaoTelli |
| `a5ec855` | Atualização do site CaoTelli |

> A partir de hoje, cada alteração ganha mensagem de commit descritiva e entrada neste CHANGELOG.
