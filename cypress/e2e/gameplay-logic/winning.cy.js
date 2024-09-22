describe("what should happen when a player wins", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".game-board").should("be.visible");
  });

  it("X should be able to win via a 3 on the top row", () => {
    for (let i = 0; i < 3; i++) {
      cy.selectSquare(0, i); // X
      cy.selectSquare(1, i); // O
    }
    cy.contains("Winner: X");
  });

  it("O should be able to win via a 3 on the middle row", () => {
    for (let i = 0; i < 3; i++) {
      cy.selectSquare(((i + 1) % 2) * 2, i); // X
      cy.selectSquare(1, i); // O
    }
    cy.contains("Winner: O");
  });

  it("X should be able to win via a 3 on the last row", () => {
    for (let i = 0; i < 3; i++) {
      cy.selectSquare(2, i); // X
      cy.selectSquare(1, i); // O
    }
    cy.contains("Winner: X");
  });

  it("X should be able to win via a 3 the first column", () => {
    for (let i = 0; i < 3; i++) {
      cy.selectSquare(i, 0); // X
      cy.selectSquare(i, 1); // O
    }
    cy.then(() => {
      cy.contains("Winner: X");
    });
  });

  it("X should be able to win via a 3 the second column", () => {
    Cypress._.times(3, (i) => {
      cy.selectSquare(i, 1); // X
      cy.selectSquare(i, 0); // O
    });
      cy.contains("Winner: X");
  });

  it("X should be able to win via a 3 the last column", () => {
    [...Array(3).keys()].forEach((key) => {
      cy.selectSquare(key, 2); // X
      cy.selectSquare(key, 1); // O

    });
    cy.then(() => {
      cy.contains("Winner: X");
    });
  });

  it("should be able to win via a 3 diagonally, left to right", () => {
    for(let i = 0; i < 3; i++){
      cy.selectSquare(i, i); // X
      cy.selectSquare(i, (i + 1) % 3); // O
    }
    cy.then(()=>{
      cy.contains("Winner: X");

    })
  });
  
  it("should be able to win via a 3 diagonally, right to left", () => {
    for(let i = 0; i < 3; i++){
      cy.selectSquare(i, 2 - i); // X
      cy.selectSquare(i, (i + 1) % 2); // O
    }
    cy.then(()=>{
      cy.contains("Winner: X");

    })
  });
});
