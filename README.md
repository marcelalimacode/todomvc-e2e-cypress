# Testes E2E do todo.qa · Cypress

[![Cypress E2E tests](https://github.com/marcelalimacode/todomvc-e2e-cypress/actions/workflows/tests.yml/badge.svg)](https://github.com/marcelalimacode/todomvc-e2e-cypress/actions/workflows/tests.yml)
![Cypress](https://img.shields.io/badge/Cypress-9-17202C?logo=cypress&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)

**Português** · [English](README.en.md)

## Sobre

Testes automatizados de ponta a ponta (E2E) de um app de lista de tarefas: criar, concluir, editar, filtrar e limpar tarefas.
Os testes rodam pela tela, como uma pessoa usando o app, e rodam automaticamente a cada push no GitHub Actions, com vídeo de cada execução.

## App testado

Um app de lista de tarefas próprio, o **todo.qa**, que fica na pasta `app/` deste repositório. Ele segue o padrão clássico do [TodoMVC](https://todomvc.com) (mesmas funcionalidades e mesmos elementos), com visual próprio: fundo escuro, roxo e toques de terminal.

Ter o app no repositório deixa o projeto independente de sites externos: os testes rodam sempre contra a mesma versão, e o app abre direto do arquivo, sem servidor.

## Tecnologias

- **Cypress 9.7**
- **JavaScript**
- **Node.js**
- **GitHub Actions** para integração contínua

## Cenários de teste

| ID | Funcionalidade | Cenário | Tipo | Resultado esperado |
| --- | --- | --- | --- | --- |
| CT01 | Lista | Abrir o app com as tarefas de exemplo | Positivo | A lista mostra 2 tarefas |
| CT02 | Criar | Adicionar uma tarefa nova | Positivo | A tarefa aparece no fim da lista e o contador sobe |
| CT03 | Criar | Tentar adicionar uma tarefa vazia | Negativo | Nada é adicionado |
| CT04 | Concluir | Marcar uma tarefa como concluída | Positivo | A tarefa fica riscada e o contador diminui |
| CT05 | Editar | Editar o texto de uma tarefa | Positivo | O texto muda e fica salvo |
| CT06 | Filtrar | Ver só as tarefas ativas | Positivo | Só as não concluídas aparecem no filtro "Ativas" |
| CT07 | Filtrar | Ver só as tarefas concluídas | Positivo | Só as concluídas aparecem no filtro "Concluídas" |
| CT08 | Apagar | Limpar as tarefas concluídas | Positivo | As concluídas somem da lista |

## Estrutura do projeto

```
todomvc-e2e-cypress/
├── app/
│   └── index.html              # O app testado (todo.qa)
├── cypress/
│   ├── integration/
│   │   └── tarefas.spec.js     # Os 8 cenários
│   ├── fixtures/
│   │   └── tarefas.json        # Textos usados nos testes
│   └── support/
│       ├── elementos.js        # Localizadores da tela em um só lugar
│       ├── commands.js         # Ações reutilizáveis (adicionar, concluir, filtrar)
│       └── index.js            # Carrega os comandos antes dos testes
├── .github/workflows/tests.yml # Pipeline de CI
├── cypress.json                # Configurações do Cypress
└── package.json
```

## Decisões de projeto

- **Comandos customizados.** Ações como `cy.adicionarTarefa()` e `cy.concluirTarefa()` deixam os testes curtos e legíveis.
- **Localizadores centralizados.** Todos ficam em `elementos.js`. Se a tela mudar, a correção é feita em um lugar só.
- **Dados em fixture.** Os textos das tarefas ficam em `tarefas.json`, fora do código dos testes.
- **App próprio.** Os testes não dependem de um site de terceiros que pode mudar ou sair do ar.
- **Testes independentes.** Cada teste abre o app do zero, então podem rodar em qualquer ordem.
- **Evidências.** O Cypress grava um vídeo de cada execução e tira print quando um teste falha.

## Como rodar

Pré-requisito: Node.js 12 ou superior. O projeto usa o Cypress 9.7, a última versão compatível com o Node 12.

```bash
# 1. Clonar o repositório
git clone https://github.com/marcelalimacode/todomvc-e2e-cypress.git
cd todomvc-e2e-cypress

# 2. Instalar o Cypress
npm install

# Para ver só o app: abra app/index.html no navegador

# 3a. Abrir a janela do Cypress e ver os testes rodando ao vivo
npm run cy:open

# 3b. Ou rodar tudo pelo terminal, sem janela
npm test
```

Na janela do Cypress, escolha o navegador no canto superior direito e clique em `tarefas.spec.js`.

## CI

O workflow em `.github/workflows/tests.yml` roda a cada push e pull request na branch `main`, e também pode ser iniciado manualmente pela aba **Actions**.
Ele roda os testes e salva os vídeos (`videos-cypress`) e, se algo falhar, os prints (`prints-cypress`) para download.

## Autora

**Marcela Lima** · Analista de QA

[LinkedIn](https://www.linkedin.com/in/marcela-lima-qa) · [GitHub](https://github.com/marcelalimacode)
