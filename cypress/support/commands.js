// Garante o uso correto do chai no contexto do Cypress
const chai = (typeof window !== 'undefined' && window.chai) ? window.chai : require('chai')
const chaiJsonSchema = require('chai-json-schema')
chai.use(chaiJsonSchema)

// Sobrescreve o comando request para adicionar x-api-key automaticamente
Cypress.Commands.overwrite('request', (origFn, options) => {
  const { _disableApiKey, headers = {}, ...rest } = options
  const finalHeaders = _disableApiKey
    ? headers
    : { 'x-api-key': Cypress.env('apiKey'), ...headers }
  return origFn({ headers: finalHeaders, ...rest })
})

// Centraliza os caminhos de API para fácil manutenção
const API_PATHS = {
  USERS: '/users'
  // Você pode adicionar outros caminhos de recursos comuns aqui
  // Ex: PRODUCTS: '/products'
}

// Validação de schema JSON
Cypress.Commands.add('validateSchema', (schema, obj) => {
  expect(obj).to.be.jsonSchema(schema)
})

// Criação de usuário
Cypress.Commands.add('createUser', (user) => {
  return cy.request({
    method: 'POST',
    url: API_PATHS.USERS,
    body: user,
    failOnStatusCode: false
  })
})

// Busca de usuário por ID
Cypress.Commands.add('getUser', (id) => {
  return cy.request({
    method: 'GET',
    url: `${API_PATHS.USERS}/${id}`,
    failOnStatusCode: false
  })
})
