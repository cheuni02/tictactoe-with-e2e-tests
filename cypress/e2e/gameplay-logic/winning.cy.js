describe("what should happen when a player wins", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get(".game-board").should("be.visible");
    });

  it("X should be able to win via a 3 on the top row", () => {    
    for(let i = 0; i < 3; i++) {
      cy.selectSquare(0, i); // X
      cy.selectSquare(1, i); // O 
    }
    cy.contains("Winner: X");
  });

  it("O should be able to win via a 3 on the middle row", () => {    
    for(let i = 0; i < 3; i++) {
      cy.selectSquare(((i+1)%2)*2, i); // X
      cy.selectSquare(1, i); // O
    }
    cy.contains("Winner: O");
  });

  it("X should be able to win via a 3 on the last row", () => {    
    for(let i = 0; i < 3; i++) {
      cy.selectSquare(2, i); // X
      cy.selectSquare(1, i); // O
    }
    cy.contains("Winner: X");
  });

  it("should be able to win via a 3 in a column", () => {

  });
  it("should be able to win via a 3 diagonally", () => {

  });
  it("should no", () => {

  });
});