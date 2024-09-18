// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const gameState = new Map();

Cypress.Commands.add("selectSquare", (row, col) => {
  cy.get(".game-board .board-row").eq(row).find(".square").eq(col).click();
});

Cypress.Commands.add("getSquareText", (row, col) => {
  return cy
    .get(".game-board .board-row")
    .eq(row)
    .find(".square")
    .eq(col)
    .then((square) => square.text());
});

let gameSnapshot = "";

Cypress.Commands.add("getCurrentGameState", () => {
  gameSnapshot = "";
  cy.get(".game-board .board-row")
    .each((row) => {
      cy.get(row)
        .find(".square")
        .each((sq) => {
          if (sq.text() == "") {
            gameSnapshot += "-";
          } else {
            gameSnapshot += sq.text();
          }
        });
    })
    .then(() => {
      return gameSnapshot;
    });
});

Cypress.Commands.add("snapshotGameStateForMove", (move) => {
  cy.getCurrentGameState().then(() => {
    gameState.set(move, gameSnapshot);
  });
});

Cypress.Commands.add("recallGameState", (move) => {
  return gameState.get(move);
});
