# todo.qa E2E Tests · Cypress

[![Cypress E2E tests](https://github.com/marcelalimacode/todomvc-e2e-cypress/actions/workflows/tests.yml/badge.svg)](https://github.com/marcelalimacode/todomvc-e2e-cypress/actions/workflows/tests.yml)
![Cypress](https://img.shields.io/badge/Cypress-9-17202C?logo=cypress&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)

[Português](README.md) · **English**

## About

End-to-end tests for a to-do list app: creating, completing, editing, filtering and clearing tasks.
The tests drive the UI like a real user, and run automatically on every push with GitHub Actions, recording a video of each run.

## Application under test

A custom to-do app, **todo.qa**, kept in the `app/` folder of this repository. It follows the classic [TodoMVC](https://todomvc.com) pattern (same features and same elements) with its own look: dark background, purple accents and a terminal feel.

Keeping the app in the repository makes the project independent from external sites: tests always run against the same version, and the app opens straight from the file, with no server.

## Tech stack

- **Cypress 9.7**
- **JavaScript**
- **Node.js**
- **GitHub Actions** for continuous integration

## Test scenarios

| ID | Feature | Scenario | Type | Expected result |
| --- | --- | --- | --- | --- |
| CT01 | List | Open the app with the sample tasks | Positive | The list shows 2 tasks |
| CT02 | Create | Add a new task | Positive | The task appears at the end and the counter goes up |
| CT03 | Create | Try to add an empty task | Negative | Nothing is added |
| CT04 | Complete | Mark a task as completed | Positive | The task is struck through and the counter goes down |
| CT05 | Edit | Edit a task's text | Positive | The text changes and is saved |
| CT06 | Filter | Show only active tasks | Positive | Only open tasks show under "Ativas" (active) |
| CT07 | Filter | Show only completed tasks | Positive | Only completed tasks show under "Concluídas" (completed) |
| CT08 | Delete | Clear completed tasks | Positive | Completed tasks are removed |

## BDD scenarios

Before automating, the 8 scenarios were written in Gherkin, in business language, in [`bdd/tarefas.feature`](bdd/tarefas.feature) (written in Portuguese). Each scenario is tagged with its ID (`@CT01` to `@CT08`), linking the specification to the automated test with the same name in `tarefas.spec.js`.

```gherkin
@CT04 @concluir @smoke
Cenário: Marcar uma tarefa como concluída
  Quando marco "Pagar a conta de luz" como concluída
  Então "Pagar a conta de luz" aparece riscada
  E o contador mostra 1 tarefa pendente
```

## Project structure

The project files are named in Portuguese.

```
todomvc-e2e-cypress/
├── app/
│   └── index.html              # The app under test (todo.qa)
├── bdd/
│   └── tarefas.feature         # The 8 scenarios in Gherkin
├── cypress/
│   ├── integration/
│   │   └── tarefas.spec.js     # The 8 scenarios
│   ├── fixtures/
│   │   └── tarefas.json        # Texts used by the tests
│   └── support/
│       ├── elementos.js        # All locators in one place
│       ├── commands.js         # Reusable actions (add, complete, filter)
│       └── index.js            # Loads the commands before the tests
├── .github/workflows/tests.yml # CI pipeline
├── cypress.json                # Cypress settings
└── package.json
```

## Design decisions

- **Custom commands.** Actions such as `cy.adicionarTarefa()` (add task) and `cy.concluirTarefa()` (complete task) keep the tests short and readable.
- **Centralized locators.** All of them live in `elementos.js`, so a UI change is fixed in one place.
- **Data in a fixture.** Task texts live in `tarefas.json`, outside the test code.
- **Own app.** Tests do not depend on a third-party site that may change or go offline.
- **Independent tests.** Every test opens the app from scratch, so tests can run in any order.
- **Evidence.** Cypress records a video of each run and takes a screenshot when a test fails.

## How to run

Requirements: Node.js 12 or newer. The project uses Cypress 9.7, the last version that supports Node 12.

```bash
# 1. Clone the repository
git clone https://github.com/marcelalimacode/todomvc-e2e-cypress.git
cd todomvc-e2e-cypress

# 2. Install Cypress
npm install

# To see only the app: open app/index.html in your browser

# 3a. Open the Cypress window and watch the tests live
npm run cy:open

# 3b. Or run everything from the terminal, headless
npm test
```

In the Cypress window, pick a browser in the top right corner and click `tarefas.spec.js`.

## CI

The workflow in `.github/workflows/tests.yml` runs on every push and pull request to `main`, and can also be started by hand from the **Actions** tab.
It runs the tests and saves the videos (`videos-cypress`) and, when something fails, the screenshots (`prints-cypress`) as downloadable artifacts.

## Author

**Marcela Lima** · QA Analyst

[LinkedIn](https://www.linkedin.com/in/marcela-lima-qa) · [GitHub](https://github.com/marcelalimacode)
