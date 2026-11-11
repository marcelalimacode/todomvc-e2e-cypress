# language: pt

Funcionalidade: Lista de tarefas (todo.qa)
  Como uma pessoa que organiza o próprio dia
  Quero criar, concluir, editar, filtrar e limpar tarefas
  Para saber sempre o que ainda falta fazer

  Contexto:
    Dado que abri o app todo.qa
    E a lista tem as tarefas "Pagar a conta de luz" e "Passear com o cachorro"

  @CT01 @lista
  Cenário: Abrir o app com as tarefas de exemplo
    Então vejo 2 tarefas na lista

  @CT02 @criar @smoke
  Cenário: Adicionar uma tarefa nova
    Quando adiciono a tarefa "Estudar Cypress"
    Então "Estudar Cypress" aparece no fim da lista
    E o contador mostra 3 tarefas pendentes

  @CT03 @criar @negativo
  Cenário: Tentar adicionar uma tarefa vazia
    Quando aperto Enter com o campo vazio
    Então nenhuma tarefa é adicionada
    E a lista continua com 2 tarefas

  @CT04 @concluir @smoke
  Cenário: Marcar uma tarefa como concluída
    Quando marco "Pagar a conta de luz" como concluída
    Então "Pagar a conta de luz" aparece riscada
    E o contador mostra 1 tarefa pendente

  @CT05 @editar
  Cenário: Editar o texto de uma tarefa
    Dado que adicionei a tarefa "Estudar Cypress"
    Quando clico duas vezes em "Estudar Cypress"
    E troco o texto para "Estudar Cypress com calma"
    Então a tarefa passa a se chamar "Estudar Cypress com calma"

  @CT06 @filtrar
  Cenário: Ver só as tarefas ativas
    Dado que concluí "Pagar a conta de luz"
    Quando escolho o filtro "Ativas"
    Então vejo apenas "Passear com o cachorro"

  @CT07 @filtrar
  Cenário: Ver só as tarefas concluídas
    Dado que concluí "Pagar a conta de luz"
    Quando escolho o filtro "Concluídas"
    Então vejo apenas "Pagar a conta de luz"

  @CT08 @apagar @smoke
  Cenário: Limpar as tarefas concluídas
    Dado que adicionei a tarefa "Revisar o README"
    E concluí "Pagar a conta de luz" e "Revisar o README"
    Quando clico em "Limpar concluídas"
    Então vejo apenas "Passear com o cachorro"
