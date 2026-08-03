# Integração PagBank — Request/Response da API

**Loja:** CãoTelli — Rações e Acessórios
**Domínio da aplicação:** https://cao-telli.vercel.app
**Ambiente:** Produção
**Erro reportado:** `403 ACCESS_DENIED — whitelist access required`

---

## 1. REQUEST — Criar pedido PIX

**Endpoint:**
```
POST https://api.pagseguro.com/orders
```

**Headers:**
```
Authorization: Bearer {TOKEN_DE_PRODUCAO}
Content-Type: application/json
```

**Body (exemplo real enviado):**
```json
{
  "reference_id": "CAOTELLI-1753900000000",
  "customer": {
    "name": "Cliente CãoTelli",
    "email": "contato@caotelli.com.br",
    "tax_id": "00000000000000"
  },
  "items": [
    {
      "name": "Ração Premium Golden 15kg",
      "quantity": 1,
      "unit_amount": 15990
    }
  ],
  "amount": {
    "value": 15990,
    "currency": "BRL"
  },
  "qr_codes": [
    {
      "amount": {
        "value": 15990
      }
    }
  ]
}
```

---

## 2. RESPONSE — Erro atual recebido

**Status HTTP:** `403 Forbidden`

**Body:**
```json
{
  "error_messages": [
    {
      "code": "ACCESS_DENIED",
      "description": "whitelist access required. Contact PagSeguro..."
    }
  ]
}
```

---

## 3. RESPONSE — Esperado (quando a whitelist for liberada)

**Status HTTP:** `200 OK`

**Body (formato esperado da API `/orders`):**
```json
{
  "id": "ORDE_XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
  "reference_id": "CAOTELLI-1753900000000",
  "created_at": "2026-07-30T14:00:00.000-03:00",
  "customer": { "...": "..." },
  "items": [ "..." ],
  "qr_codes": [
    {
      "id": "QRCO_XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
      "expiration_date": "2026-07-30T15:00:00.000-03:00",
      "amount": { "value": 15990 },
      "text": "00020101021226830014br.gov.bcb.pix..."
    }
  ]
}
```

O campo `qr_codes[0].text` é o **PIX copia-e-cola** que exibimos pro cliente final.

---

## 4. INFORMAÇÕES ADICIONAIS

- **Backend:** Node.js (função serverless na Vercel)
- **Frontend:** SPA hospedada em GitHub Pages (`https://liezerlad21-commits.github.io/CaoTelli/`)
- **Origem das chamadas:** IPs dinâmicos da Vercel (não temos IP fixo — é infraestrutura serverless)
- **Solicitação:** liberação de acesso **irrestrita por IP** (aceitar qualquer origem) pra aplicação/token do vendedor.

O token de produção foi gerado pelo painel PagBank do vendedor e passa na autenticação (não é erro 401). O bloqueio é exclusivamente de permissão/whitelist (403).

---

**Arquivo de referência do código:** `api/checkout.js` (função serverless Vercel)
