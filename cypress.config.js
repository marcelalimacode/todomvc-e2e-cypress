const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // Endereço do app testado: TodoMVC mantido pelo próprio Cypress para treino
    baseUrl: 'https://example.cypress.io',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1280,
    viewportHeight: 800,
    // Grava um vídeo de cada execução no terminal e no GitHub Actions
    video: true
  }
})
