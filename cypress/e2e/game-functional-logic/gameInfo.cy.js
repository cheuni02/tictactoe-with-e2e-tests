describe("Game Info tracking steps taken and ability to time travel and modify game at any point", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".game-board").should("be.visible");
  });
  
  it("can recall back to any move in the game if needed", () => {
    let move = 1;
    cy.selectSquare(0, 0);
    cy.snapshotGameStateForMove(move++);
    cy.selectSquare(1, 1);
    cy.snapshotGameStateForMove(move++);
    cy.selectSquare(2, 2);
    cy.snapshotGameStateForMove(move++);

    for (let i = 1; i < move; i++) {
      cy.get(".game-info ol li button").contains(`Go to move #${i}`).click();
      cy.getCurrentGameState().then((gameState) => {
        cy.recallGameState(i).then((recalledGameState) => {
          expect(gameState).to.eq(recalledGameState);
        });
      });
    }
  });

  it("can change the history of the game at any point, including resetting the game", () => {
    let move = 1;
    cy.selectSquare(0, 0);
    cy.snapshotGameStateForMove(move++);
    cy.selectSquare(1, 1);
    cy.snapshotGameStateForMove(move++);
    cy.selectSquare(2, 2);
    cy.snapshotGameStateForMove(move++);
    cy.selectSquare(1, 2);
    cy.snapshotGameStateForMove(move++);

    cy.getGameHistory().then((gameHistory) => {
      const map1 = new Map(gameHistory);
      cy.displayGameHistory(map1);
      move = 2;
      cy.contains("Go to move #2").click();
      cy.selectSquare(0, 1);
      cy.snapshotGameStateForMove(move++);
      cy.selectSquare(1, 0);
      cy.snapshotGameStateForMove(move++);
      cy.getGameHistory().then((gameHistory) => {
        const map2 = new Map(gameHistory);
        expect(map1).not.eq(map2);
      });
    });
  });

  it("subsequent steps removed if user back tracks to a particular step, and continues from that point", () => {
    let countInitialMoves = 0;
    cy.selectSquare(0, 0);
    cy.selectSquare(1, 1);
    cy.selectSquare(2, 2);
    cy.selectSquare(1, 2);
    cy.selectSquare(2, 0);
    cy.selectSquare(2, 1);
    cy.countMoves().then((count) => {
      countInitialMoves = count;
      expect(count).to.eq(6);
      for (let i = 1; i <= count; i++) {
        cy.get(".game-info ol li button")
          .contains(`Go to move #${i}`)
          .should("exist");
      }
    });

    cy.contains("Go to move #2").click();
    cy.selectSquare(2, 0).then(() => {
      for (let i = 1; i <= countInitialMoves; i++) {
        if (i < 4) {
          cy.get(".game-info ol li button")
            .contains(`Go to move #${i}`)
            .should("exist");
        } else {
          cy.get(".game-info ol li button")
            .contains(`Go to move #${i}`)
            .should("not.exist");
        }
      }
    });
  });
});