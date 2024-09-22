describe("Ability to select a square", () => {
  let gameSize = 3;

  it("X and O can take turns to select a square", () => {
    cy.contains("Next player: X");
    cy.selectSquare(0, 0);
    cy.getSquareText(0, 0).should("eq", "X");
    cy.contains("Next player: O");
    cy.selectSquare(0, 1);
    cy.getSquareText(0, 1).should("eq", "O");
    cy.contains("Next player: X");
    cy.selectSquare(0, 2);
    cy.getSquareText(0, 2).should("eq", "X");
  });

  it("Once a square is selected by one opponent it cannot be selected again by the other opponent", () => {
    cy.selectSquare(0, 0);
    cy.getSquareText(0, 0).should("eq", "X");
    cy.selectSquare(0, 0);
    cy.getSquareText(0, 0).should("eq", "X");
  });

  it("Game info increases when each player chooses a square", () => {
    // in the begining of the game, the game info should be only 1 row "Go to game start"
    let countInfo = 1;
    cy.get(".game-info ol li").should("have.length", countInfo);
    // X chooses square (0, 0)
    cy.selectSquare(0, 0);
    cy.get(".game-info ol li")
      .should("have.length", ++countInfo)
      .each((li, index) => {
        if (index == 1) {
          expect(li.text()).to.eq(`Go to move #${index}`);
        }
      });
    // O chooses square (1, 1)
    cy.selectSquare(1, 1);
    cy.get(".game-info ol li")
      .should("have.length", ++countInfo)
      .each((li, index) => {
        if (index == 2) {
          expect(li.text()).to.eq(`Go to move #${index}`);
        }
      });
  });

  it("player X should be able to select any square - using for loop", () => {
    for (let i = 0; i < gameSize; i++) {
      for (let j = 0; j < gameSize; j++) {
        cy.selectSquare(i, j).then((square) => {
          expect(square.text()).to.eq("X");
        });
        cy.visit("/");
      }
    }
  });
});
