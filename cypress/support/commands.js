const chai = window.chai || require('chai')
const chaiJsonSchema = require('chai-json-schema')
chai.use(chaiJsonSchema)

Cypress.Commands.overwrite('request', (origFn, options) => {
  const { _disableApiKey, headers = {}, ...rest } = options
  const finalHeaders = _disableApiKey
    ? headers
    : { 'x-api-key': Cypress.env('apiKey'), ...headers }
  return origFn({ headers: finalHeaders, ...rest })
})

Cypress.Commands.add('validateSchema', (schema, obj) => {
  expect(obj).to.be.jsonSchema(schema)
})

Cypress.Commands.add('createUser', (user) => {
  return cy.request({
    method: 'POST',
    url: '/users',
    body: user,
    failOnStatusCode: false
  })
})

Cypress.Commands.add('getUser', (id) => {
  return cy.request({
    method: 'GET',
    url: `/users/${id}`,
    failOnStatusCode: false
  })
})
