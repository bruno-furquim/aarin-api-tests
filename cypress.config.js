const { defineConfig } = require('cypress')
require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL,
    supportFile: 'cypress/support/e2e.js',
    defaultCommandTimeout: 8000,
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true
    },
    env: {
      apiKey: process.env.API_KEY
    },
    retries: {
      runMode: 2,
      openMode: 0
    },
    specPattern: 'cypress/e2e/**/*.spec.js',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
      return config
    }
  }
})
