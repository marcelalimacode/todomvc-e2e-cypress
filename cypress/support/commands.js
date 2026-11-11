import { elementos } from './elementos'

// Ações reutilizáveis, escritas como o usuário faria

Cypress.Commands.add('abrirApp', () => {
  cy.visit('/todo')
  cy.get(elementos.campoNovaTarefa).should('be.visible')
})

Cypress.Commands.add('adicionarTarefa', (texto) => {
  cy.get(elementos.campoNovaTarefa).type(`${texto}{enter}`)
})

Cypress.Commands.add('concluirTarefa', (texto) => {
  cy.contains(elementos.itensDaLista, texto).find(elementos.caixaConcluir).check()
})

Cypress.Commands.add('filtrarPor', (filtro) => {
  cy.get(elementos.filtros).contains(filtro).click()
})
