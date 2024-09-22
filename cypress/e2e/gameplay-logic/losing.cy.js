describe("what should happen when a player loses", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".game-board").should("be.visible");
  });

  it("when O loses O cannot continue to play the game", () => {
    cy.contains("Next player")
      .then(() => {
        cy.selectSquare(0, 0); // X
        cy.selectSquare(1, 0); // O
        cy.selectSquare(0, 1); // X
        cy.selectSquare(1, 1); // O
        cy.selectSquare(0, 2); // X
      })
      .selectSquare(1, 2) // O attempts to play on this square
      .getSquareText(1, 2)
      .then((text) => expect(text).to.eq(""));  
  });
});
