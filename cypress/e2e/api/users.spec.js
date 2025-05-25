import { faker } from '@faker-js/faker'

const createUserSchema = require('../../fixtures/schemas/createUserSchema.json')
const getUserSchema    = require('../../fixtures/schemas/getUserSchema.json')

describe('🚀 API Users @reqres', () => {
  beforeEach(() => {
    cy.intercept({ method: 'POST', url: '/users' }).as('createUser')
    cy.intercept({ method: 'GET',  url: '/users/*' }).as('getUser')
  })

  it('POST /users — deve criar usuário com sucesso', () => {
    cy.fixture('createUserPayload').then((payload) => {
      // Garante que o payload original não seja alterado globalmente
      const userPayload = { ...payload }
      userPayload.name = faker.person.firstName()
      userPayload.job  = faker.person.jobTitle()

      cy.createUser(userPayload).then((res) => {
        expect(res.status).to.eq(201)
        expect(res.requestHeaders).to.include({
          'x-api-key': Cypress.env('apiKey')
        })
        cy.validateSchema(createUserSchema, res.body)
      })
    })
  })

  it('GET /users/2 — deve retornar dados do usuário existente', () => {
    cy.getUser(2).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.requestHeaders).to.include({
        'x-api-key': Cypress.env('apiKey')
      })
      cy.validateSchema(getUserSchema, res.body)
    })
  })

  it('GET /users/:id — usuário inexistente deve retornar 404', () => {
    cy.getUser(9999).then((res) => {
      expect(res.status).to.eq(404)
    })
  })

  // ── CENÁRIOS NEGATIVOS ────────────────────────────────────

  it('POST /users sem x-api-key — retorna 401 Missing API key', () => {
    cy.request({
      method: 'POST',
      url: '/users',
      body: { name: 'X', job: 'Y' },
      failOnStatusCode: false,
      _disableApiKey: true
    }).then((res) => {
      expect(res.status).to.eq(401)
      expect(res.body).to.have.property('error', 'Missing API key.')
    })
  })

  it('POST /users com x-api-key inválido — retorna 401 Invalid API key', () => {
    cy.request({
      method: 'POST',
      url: '/users',
      body: { name: 'X', job: 'Y' },
      failOnStatusCode: false,
      headers: { 'x-api-key': 'invalid-key' }
    }).then((res) => {
      expect(res.status).to.eq(401)
      expect(res.body).to.have.property('error', 'Invalid API key.')
    })
  })
})
