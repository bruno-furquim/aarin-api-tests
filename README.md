# AARIN API TESTS

Suite de testes automatizados de API desenvolvida para a empresa **Aarin Tech-Fin**.

> **Autor:** Bruno Furquim  
> **Data:** 2025

![CI](https://img.shields.io/badge/ci-passing-brightgreen)

## Sobre o Projeto

Este repositório contém uma suíte de testes de API utilizando o Cypress, com foco em:
- Validação de contrato (chai-json-schema)
- Interceptação e spies (cy.intercept)
- Retentativas automáticas (retries)
- Relatórios detalhados (mochawesome)
- Gerenciamento de variáveis de ambiente via `.env`

## Como começar

1. Copie o arquivo `.env.example` para `.env` e ajuste as variáveis conforme necessário.
2. Instale as dependências do projeto:
   ```bash
   npm install
   ```

## Como executar os testes

- **Modo Headless / CI**
  ```bash
  npm run test:api
  ```
  Executa todos os testes de API em modo headless (sem interface gráfica), ideal para pipelines CI/CD.

- **Modo Interativo**
  ```bash
  npm run cy:open
  ```
  Abre a interface gráfica do Cypress para execução e depuração dos testes.

## Relatórios

Após a execução dos testes, os relatórios em HTML estarão disponíveis em `cypress/reports/*.html`.

No ambiente de CI, os relatórios são disponibilizados como artefatos para download.

## Estrutura do Projeto

```
cypress/
  e2e/           # Testes de API
  fixtures/      # Dados de teste e schemas
  reports/       # Relatórios gerados
  support/       # Comandos customizados e configuração
cypress.config.js # Configuração do Cypress
package.json      # Dependências e scripts
```

---

Feito com ❤️ por Bruno Furquim para a Aarin Tech-Fin.
