# AARIN API TESTS

![CI](https://img.shields.io/badge/ci-passing-brightgreen)

Suite de testes de API em Cypress com:
- Validação de contrato (chai-json-schema)
- Intercept & spies (cy.intercept)
- Retentativas automáticas (retries)
- Relatórios (mochawesome)
- Variáveis de ambiente via `.env`

## Setup

1. Copie `.env.example` para `.env` e ajuste, se necessário.  
2. Instale dependências:
   ```bash
   npm install
   ```

## Executar testes

- **Headless / CI**  
  ```bash
  npm run test:api
  ```

- **Interativo**  
  ```bash
  npm run cy:open
  ```

## Relatórios

Após a execução, veja em `cypress/reports/*.html`.  
No CI, os artefatos ficam disponíveis para download.
