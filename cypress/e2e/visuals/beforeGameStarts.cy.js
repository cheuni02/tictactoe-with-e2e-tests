describe("Texts shown/ layout before game begins", () => {
  const firstButtonCopy = "Go to game start";
  
  it("should show that the first player is X", () => {
    cy.contains("Next player: X");
  });

  it("board squares should be all blank", () => {
    cy.get(".game-board .board-row").each((row) => {
      cy.get(row).find(".square").each((sq) => {
        cy.get(sq).then((square) => {
          expect(square.text()).to.eq("");
        });
      });
    });
  });
  
  it("should have a button which shows 'Go to game start' and when clicked nothing should happen", () => {
    let networkCalled = false;
    cy.intercept("*", () => { networkCalled = true }).as("anyRequest");
    cy.get("body").then((body) => {
      const initialDOM = body.html();
      cy.get("ol li:first-child").contains(firstButtonCopy).click();
      // assert that no network requests were triggered
      cy.then(() => {
        expect(networkCalled).to.be.false;
      })

      // checking that the DOM hasn't changed after the button was clicked
      cy.get("body").then((bodyAfterClick) => {
        expect(bodyAfterClick.html()).to.eq(initialDOM);

        cy.log(`before: ${initialDOM}`);
        cy.log(`after: ${bodyAfterClick.html()}`);
      });

    });
  });
});
