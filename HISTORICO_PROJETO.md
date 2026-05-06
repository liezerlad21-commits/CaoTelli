# HISTÓRICO DO PROJETO — Site CãoTelli PetShop

> **Leia este arquivo primeiro.** Ele contém todo o contexto do projeto: o que foi feito, como está organizado, decisões de design e onde paramos. Atualizar sempre antes de encerrar uma sessão.

---

## 1. VISÃO GERAL

**Cliente:** CãoTelli — Rações e Acessórios
**Endereço:** Av. Santos Ferreira, 997 — Bairro Mal. Rondon, Canoas/RS
**WhatsApp:** (51) 99765-5755 — `https://wa.me/5551997655755`
**Instagram:** @caotelli
**Horário:** Segunda a Sábado, 9h às 19h
**Entrega:** até 3h ou agendada (sempre antes de 24h)

**Desenvolvedor:** Liézer
**Contexto:** TCC de 200 horas (e-commerce real para PetShop).
**Hospedagem:** GitHub Pages — `https://liezerlad21-commits.github.io/CaoTelli/`.
**Versionamento:** Git + GitHub (repositório privado).

---

## 2. ESTRUTURA DE ARQUIVOS

```
CaoTelli/
├── index.html                          ← site inteiro (SPA em arquivo único)
├── logo_caotelli.png                   ← logo principal
├── Logo pet shop com co.png            ← versão alternativa da logo
├── PushCaoTelli.bat                    ← script para commit/push rápido
├── README.md                           ← descrição curta do projeto
├── HISTORICO_PROJETO.md                ← este arquivo
├── Documentacao_Projeto_CaoTelli.docx  ← documentação acadêmica do TCC
├── Carta_de_Apresentacao_CaoTelli.docx
├── Ficha_de_Frequencia_CaoTelli.docx
└── .git/                               ← repositório
```

**Filosofia:** tudo (HTML + CSS + JS) mora em um único `index.html` (SPA puro). Sem build, sem framework. É só abrir no navegador.

---

## 3. IDENTIDADE VISUAL

**Paleta (variáveis CSS em `:root`):**
- `--primary-cyan: #0088C2` — cor principal (azul)
- `--primary-purple: #D6324A` — cor de destaque (vermelho/magenta)
- `--dark-bg: #f4f7fb` — fundo geral (tema claro)
- `--dark-secondary: #ffffff` — fundo de cards
- `--dark-tertiary: #e4eaf3` — fundo auxiliar
- `--text-light: #1a2340` — texto principal
- `--text-gray: #5a6a85` — texto secundário

**Tipografia:**
- Corpo: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- Decorativa (marca): `Dancing Script` (Google Fonts)
- Ícones: Font Awesome 6.5.0

**Animações já definidas:** `glow`, `slide`, `pulse`, `fadeIn`, `float`.

---

## 4. ESTRUTURA DO index.html (mapa de linhas aproximado)

| Linhas | Conteúdo |
|---|---|
| 1–9 | `<head>` + imports (fonts, Font Awesome) |
| 9–1276 | `<style>` interno (todo o CSS) |
| 1278–1302 | `<header>` (logo, busca, ícones carrinho/perfil/contato) |
| 1303–1315 | `<nav>` (oculto por padrão) |
| 1316–1357 | Hero section |
| 1358–1364 | Seção de produtos (`#produtosSection`) |
| 1365–1384 | Seção principal (cupons, `#couponsGrid`) |
| 1385–1439 | Agendamento (`#agendamento`, oculta) |
| 1440–1502 | Vacinas (`#vacinas`, oculta) |
| 1503–1551 | Perfil / cadastro (`#profile`, oculta) |
| 1552–1591 | Contato (`#contact`, oculta) |
| 1592–1634 | Footer |
| 1636– | `<script>` (lógica JS) |
| ~2191 | Modal do carrinho (`#cartModal`) |
| ~2240 | Modal Pix (`#pixModal`) |
| ~2297 | Lightbox de produto (`#lightboxOverlay`) |

> **Padrão:** seções extras usam a classe `hidden-section` e são exibidas via `openSection(id)`.

---

## 5. FUNCIONALIDADES JÁ IMPLEMENTADAS

### 5.1 Catálogo (55 produtos)
- Categorias: `racao`, `remedios`, `acessorios` (areia), `brinquedos` (inclui casinhas e arranhadores).
- Array `products` com campos: `id`, `name`, `category`, `price`, `emoji`, `imgUrl`, `description`.
- Alguns produtos de brinquedos ainda estão com `imgUrl:""` (precisam de imagem).

### 5.2 Cupons (4 ativos)
| Código | Desconto | Descrição |
|---|---|---|
| `BEMPET15` | 15% | Primeira compra |
| `VERÃO20` | 20% | Toda a loja |
| `FRETE10` | 10% | Frete |
| `PREMIUM25` | 25% | Produtos selecionados |

### 5.3 Carrinho de compras
- Estado em memória: `let cart = []`, `let appliedCoupon = null`.
- Funções: `addToCart`, `increaseQty`, `decreaseQty`, `removeFromCart`, `updateCart`, `renderCartItems`, `calculateTotal`.
- Frete: **grátis acima de R$ 59,90**, senão **R$ 15,00**.
- Modal lateral (`#cartModal`) com resumo, cupom, subtotal, desconto, frete e total.

### 5.4 Checkout + Pagamento PIX
- `checkout()` → abre `#pixModal`.
- Chave Pix (simulada): `caotelli@pagamento.com`.
- Botão copiar chave (`copiarChavePix`).
- Botão enviar comprovante por WhatsApp (`enviarComprovante`) já monta mensagem com itens do carrinho.
- Botão cancelar melhorado (último commit: `9579aab`).

### 5.5 Busca
- `searchProducts()` filtra por nome, descrição ou categoria e atualiza `#productsGrid`.

### 5.6 Lightbox de produto
- `openLightbox(id)` / `closeLightbox(e)` mostra imagem grande + nome + descrição.

### 5.7 Navegação entre seções
- `openSection('agendamento' | 'vacinas' | 'profile' | 'contact')` alterna a exibição.
- `showCategory('racao' | 'remedios' | ...)` filtra o grid.

### 5.8 Formulários
- **Agendamento** (`submitAgendamento`) — data, horário, tipo de entrega.
- **Vacinas** (`submitVacina`) — espécie, raça, próxima dose.
- **Perfil/Cadastro** (`salvarCadastro`) — nome, e-mail, telefone, CPF, endereço, pet, raça.
  - Salva em `localStorage.caotelli_clientes` (array JSON).
- **Contato** (`submitContato`).
- Todas usam `showNotification(msg, type)` para feedback (verde/vermelho).

### 5.9 Footer
- Links: Sobre, Privacidade, Termos, Trocas/Devoluções, Frete.
- Atendimento: Central de Ajuda, Rastrear Pedido, Fale Conosco, Trabalhe Conosco, FAQ.
- Contato real (WhatsApp, Instagram, horário, endereço).

---

## 6. DECISÕES DE DESIGN E PADRÕES

- **Responsivo:** desktop, tablet e celular (breakpoints dentro do `<style>`).
- **Tema claro** em todo o site.
- **Sem dependências pesadas:** só Google Fonts e Font Awesome via CDN.
- **Persistência:** `localStorage` para cadastro de clientes (chave `caotelli_clientes`). Carrinho ainda é apenas em memória.
- **Notificações:** injetadas dinamicamente via JS com estilo próprio.
- **Acessibilidade:** alguns ícones têm `title` para tooltips; ainda falta revisar `aria-*`.

---

## 7. PRÓXIMOS PASSOS (backlog priorizado)

1. **Autenticação de usuários** — login/senha, sessão via `localStorage` ou back-end.
2. **Integração de pagamento real** — PIX via Mercado Pago (API), cartão de crédito.
3. **Persistir o carrinho** em `localStorage` (para não perder ao recarregar).
4. **Painel administrativo** — gerenciar produtos, preços, pedidos.
5. **Histórico de pedidos por cliente.**
6. **Notificações** por WhatsApp/e-mail (confirmação de pedido).
7. **Atualizar imagens** dos brinquedos que ainda estão com `imgUrl:""`.
8. **SEO** — meta tags (description, og:*, twitter:*), `alt` nas imagens, sitemap.xml, robots.txt.
9. **PWA** — manifest.json + service worker para funcionar offline e instalar no celular.
10. **Validação real** dos formulários (CPF, telefone, e-mail, data futura no agendamento).

---

## 8. HISTÓRICO DE COMMITS (últimos 20)

```
a5ec855 Atualizacao do site CaoTelli
522f5b0 Atualizacao do site CaoTelli
b2d20bd Atualizacao do site CaoTelli
fd0cac7 Atualizacao do site CaoTelli
188082d Atualizacao do site CaoTelli
64af40d Atualizacao do site CaoTelli
5e34579 Atualizacao do site CaoTelli
27bdd53 Atualizacao do site CaoTelli
f132b8b Atualizacao do site CaoTelli
2411c75 Atualizacao do site CaoTelli
c59c695 Atualizacao do site CaoTelli
f64938a Atualizacao do site CaoTelli
21c9df6 Atualizacao do site CaoTelli
fe14587 Atualizacao do site CaoTelli
20fb551 Atualizacao do site CaoTelli
eb4115f Atualizacao do site CaoTelli
279cab4 Atualizacao do site CaoTelli
6c5b5d5 Atualizacao do site CaoTelli
ae05318 Atualizacao do site CaoTelli
9579aab Melhora botao cancelar no modal Pix   ← última alteração pontual
```

**Sugestão futura:** usar mensagens de commit descritivas (ex.: `feat: adiciona login por e-mail`, `fix: corrige cálculo de frete quando subtotal = 59.90`).

---

## 9. ONDE PARAMOS — SESSÃO ATUAL

**Data:** 06/05/2026

- **Skill de retomada criada** no Cowork (Claude): skill `caotelli` que lê automaticamente o `HISTORICO_PROJETO.md` a cada nova sessão e apresenta resumo compacto do estado do projeto (última sessão, o que foi feito, próximos passos). Resolve o problema de perda de contexto entre sessões.

---

## 9.1 SESSÃO ANTERIOR — 21/04/2026

- Confirmado que o carrinho já estava persistido no localStorage (feito em sessão anterior). Item 3 do backlog concluído.
- **SEO implementado** no `index.html`:
  - `<title>` atualizado com palavras-chave locais.
  - `<meta name="description">` com texto otimizado para Canoas/RS.
  - `<meta name="keywords">` com termos relevantes.
  - `<meta name="robots">` e `<link rel="canonical">`.
  - Tags Open Graph completas (og:title, og:description, og:image, og:url, og:type, og:locale, og:site_name) — link bonito no WhatsApp/Facebook.
  - Twitter Card configurado.
  - Favicon e apple-touch-icon apontando para `logo_caotelli.png`.
- Criados `sitemap.xml` e `robots.txt` na raiz do projeto.
- **Atenção:** as URLs nos arquivos de SEO usam `https://liezerlad21-commits.github.io/CaoTelli/` como placeholder. Atualizar se o domínio real for diferente.
- **Imagens dos brinquedos corrigidas** (item 7 do backlog ✅): As 12 URLs do Mercado Livre (mlstatic.com) que estavam quebradas/mostrando produtos errados foram substituídas por fotos do Pexels (CDN estável, gratuito). Cada produto agora tem imagem correspondente ao tipo correto:
  - id:44 Bola Interativa → cão jogando bola
  - id:45 Corda de Brincar → cães no cabo de guerra
  - id:46 Mordedor Kong → cão mordendo brinquedo
  - id:47 Ratinho Catnip → gatinho com brinquedo ratinho
  - id:48 Varinha com Penas → gato com penas
  - id:49 Bolinha com Guizo → gato brincando com bolinha
  - id:50 Casinha Madeira → cão em estrutura de madeira
  - id:51 Casinha Plástica → cão brincando ao ar livre
  - id:52 Casinha Pelúcia Gatos → gato confortável em casa
  - id:53 Arranhador Sisal → gato brincando com cordinha
  - id:54 Arranhador Papelão → gato bengal em superfície
  - id:55 Torre Arranhador 3 Andares → gato em torre

**Sessão 21/04/2026 — O que foi feito:**

### Hero
- Gradiente claro (azul pastel → azul celeste → rosinha) com texto branco + sombra forte para legibilidade.
- Padding reduzido ao mínimo para o conteúdo subir na tela e os círculos ficarem longe da barra de tarefas.
- Espaçamentos internos (h1, p, linha dos círculos) todos compactados.

### Seção "Produtos em Destaque" (`destaques-section`)
- 4 cards com imagem, tag colorida, preço inicial e botão que filtra produtos por categoria.
- Adicionada antes do rodapé.

### Seção "Nossa Equipe" (`equipe-section`)
- Layout de 3 colunas: texto à esquerda | foto centralizada (605px) | texto à direita.
- Foto real da equipe (`equipe_caotelli.jpg`) com borda e sombra.
- 4 diferenciais divididos nos dois lados + botão WhatsApp.
- Responsivo: empilha no celular.

### Círculo "Nossa Equipe" no hero
- Adicionado após o círculo de Vacinas na barra de categorias.
- Usa a `equipe_caotelli.jpg` como imagem do círculo.
- Ao clicar, rola até a seção Nossa Equipe.

### Submenus em cascata (hover)
- Cada círculo do hero exibe um submenu ao passar o mouse, com itens específicos:
  - **Todos:** Para Cães / Para Gatos / Ver Tudo
  - **Cães:** Ração / Remédios / Brinquedos / Acessórios (filtros por pet)
  - **Gatos:** Ração / Remédios / Brinquedos / Areia Higiênica
  - **Farmácia:** Remédios p/ Cão / Remédios p/ Gato / Ver Todos
  - **Acessórios:** Para Cães / Para Gatos / Ver Todos
  - **Brinquedos:** Para Cães / Para Gatos / Ver Todos
  - **Agendamento:** Entrega Expressa / Entrega Agendada
  - **Vacinas:** Vacina Cão / Vacina Gato
  - **Nossa Equipe:** Conheça a Equipe / Fale Conosco
  - **Outros:** campo de busca por marca (filtra produtos em tempo real)
- Dropdown usa `position:fixed`, aparece **abaixo** do botão, largura `max-content` centralizada no círculo.
- Implementado via JS puro (sem bibliotecas).

### Outros ajustes visuais
- Bordas dos cards de produto: de `2px` → `1px` (mais finas).
- Entrega expressa atualizada para **60 minutos** em todo o site (meta tags, seção equipe, FAQ).
- Botões do hero: texto escuro (`#1a2340`).
- Arquivo `equipe_caotelli.jpg` salvo e renomeado na raiz do projeto.

**Sessão 21/04/2026 — CONTINUAÇÃO (tarde)**

### Ajustes finais nos submenus em cascata:
- Dropdown posicionado **acima do botão**, centralizado nas laterais.
- Largura do dropdown = **largura do botão × 1.44** (dois aumentos de 20%).
- Transparência do dropdown: `rgba(255,255,255,0.11)` com `backdrop-filter: blur(10px)` — efeito vidro fosco bem transparente.
- Botão **"Outros"**: campo de busca por marca com placeholder curto ("Marca...") e largura proporcional ao botão.
- Dropdown do "Outros" também usa `max-content` para não forçar largura maior que os outros.

### Ajuste do push para o GitHub:
- Identificado problema com `index.lock` bloqueando o git do Windows.
- Solução: apagar o lock via CMD (`del /f`) e rodar `git add -A && git commit && git push` direto no CMD.
- Confirmado que o último commit já tinha todas as alterações da sessão.

**Próxima ação sugerida:** commitar as alterações desta tarde, depois seguir para Firebase (autenticação) ou validação dos formulários.

---

## 10. SESSÃO 17/04/2026 — CONTINUAÇÃO

### O que foi feito:
- **Todas as 12 imagens dos brinquedos corrigidas** com links fornecidos pelo Liézer (URLs reais de produtos).
- **Logo clicável** adicionada no header — ao clicar na logo, fecha qualquer seção aberta e volta ao topo da página inicial.
- Commits e push feitos pelo GitHub Desktop com sucesso.

### Próximos passos combinados:
1. **Firebase** — implementar login/cadastro real com autenticação
2. **Mercado Pago** — integrar Pix + cartão de crédito real
3. **Domínio .com.br** — registrar em registro.br (~R$40/ano)

### Contas que o cliente (CãoTelli) precisa criar:
- **Firebase:** [firebase.google.com](https://firebase.google.com) — gratuito (pode criar com e-mail do cliente)
- **Mercado Pago:** [mercadopago.com.br](https://mercadopago.com.br) — gratuito (precisa de CPF/CNPJ)
- **Registro.br:** [registro.br](https://registro.br) — R$40/ano (precisa de CPF/CNPJ)
- Liézer vai criar as contas pelo cliente assim que tiver os dados.

### Limites Firebase gratuito (Spark Plan):
- Usuários: ilimitado
- Leituras: 50.000/dia (~1.500 a 3.000 visitas/dia — suficiente para petshop local)
- Escrituras: 20.000/dia
- Se crescer muito: plano pago ~U$25/mês

### Custo fixo do projeto completo:
| Item | Custo |
|---|---|
| Domínio .com.br | R$40/ano |
| Hospedagem + banco + login (Firebase) | R$0 |
| Pagamento online (Mercado Pago) | R$0 (taxa ~3-5% por venda) |
| **Total fixo** | **R$40/ano** |

### Comandos úteis de Git para voltar no tempo

```bash
# Ver últimos commits
git log --oneline -10

# Ver o index.html de um commit antigo (sem mudar nada)
git show COMMIT_HASH:index.html > index_antigo.html

# Restaurar o index.html de um commit antigo (substitui o atual)
git checkout COMMIT_HASH -- index.html

# Desfazer a restauração e voltar ao estado atual
git checkout HEAD -- index.html

# Comparar duas versões
git diff HASH1 HASH2 -- index.html
```

---

## 10. COMO USAR ESTE ARQUIVO NA PRÓXIMA SESSÃO

**No início de cada sessão, diga:**
> "Lê o `HISTORICO_PROJETO.md` da pasta do site."

**Ao final de cada sessão, diga:**
> "Atualiza o histórico com o que fizemos hoje."

Assim a seção **9. ONDE PARAMOS** fica sempre viva e eu não perco o fio da meada entre uma conversa e outra.
