import { elementos } from '../support/elementos'

describe('Lista de tarefas (TodoMVC)', () => {
  let tarefas

  before(() => {
    cy.fixture('tarefas').then((dados) => {
      tarefas = dados
    })
  })

  beforeEach(() => {
    cy.abrirApp()
  })

  it('CT01 - Abrir o app com as tarefas de exemplo', () => {
    cy.get(elementos.itensDaLista).should('have.length', 2)
    cy.get(elementos.itensDaLista).first().should('have.text', tarefas.iniciais[0])
    cy.get(elementos.itensDaLista).last().should('have.text', tarefas.iniciais[1])
  })

  it('CT02 - Adicionar uma tarefa nova', () => {
    cy.adicionarTarefa(tarefas.nova)

    cy.get(elementos.itensDaLista).should('have.length', 3)
    cy.get(elementos.itensDaLista).last().should('have.text', tarefas.nova)
    cy.get(elementos.contador).should('contain', '3')
  })

  it('CT03 - Tentar adicionar uma tarefa vazia', () => {
    cy.get(elementos.campoNovaTarefa).type('{enter}')

    cy.get(elementos.itensDaLista).should('have.length', 2)
  })

  it('CT04 - Marcar uma tarefa como concluída', () => {
    cy.concluirTarefa(tarefas.iniciais[0])

    cy.contains(elementos.itensDaLista, tarefas.iniciais[0]).should('have.class', 'completed')
    cy.get(elementos.contador).should('contain', '1')
  })

  it('CT05 - Editar o texto de uma tarefa', () => {
    cy.adicionarTarefa(tarefas.nova)

    cy.contains(elementos.itensDaLista, tarefas.nova).find('label').dblclick()
    cy.get(elementos.itensDaLista).last().find(elementos.campoEdicao)
      .clear()
      .type(`${tarefas.editada}{enter}`)

    cy.get(elementos.itensDaLista).last().should('have.text', tarefas.editada)
  })

  it('CT06 - Ver só as tarefas ativas', () => {
    cy.concluirTarefa(tarefas.iniciais[0])
    cy.filtrarPor('Active')

    cy.get(elementos.itensDaLista).should('have.length', 1)
    cy.get(elementos.itensDaLista).first().should('have.text', tarefas.iniciais[1])
  })

  it('CT07 - Ver só as tarefas concluídas', () => {
    cy.concluirTarefa(tarefas.iniciais[0])
    cy.filtrarPor('Completed')

    cy.get(elementos.itensDaLista).should('have.length', 1)
    cy.get(elementos.itensDaLista).first().should('have.text', tarefas.iniciais[0])
  })

  it('CT08 - Limpar as tarefas concluídas', () => {
    cy.adicionarTarefa(tarefas.outra)
    cy.concluirTarefa(tarefas.iniciais[0])
    cy.concluirTarefa(tarefas.outra)

    cy.get(elementos.botaoLimparConcluidas).click()

    cy.get(elementos.itensDaLista).should('have.length', 1)
    cy.get(elementos.itensDaLista).first().should('have.text', tarefas.iniciais[1])
  })
})
