const { test, expect } = require("@playwright/test");
const { firefox, chromium, webkit } = require("playwright");

test.describe("Texts shown/ layout before game begins", () => {
  const firstButtonCopy = "Go to game start";
  let browser, context, page;

  test.beforeEach(async() => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();

    await page.goto("/");
    await expect(page.locator(`[data-test="game-board"]`)).toBeVisible();
  })
  
  
  test("should show that the first player is X", { tag: "@smoke" }, async () => {
    const statusIndicator = await page.locator(`[data-test="status"]`);
    await expect(statusIndicator).toHaveText("Next player: X");
  });

  test("board squares should be all blank", async () => {
    const squares = await page.locator(`[data-test="square"]`).all();
    squares.forEach((square) => expect(square).toHaveText(""));
  });
  
  test("should have a button which shows 'Go to game start' and when clicked nothing should happen", async () => {
    const startButton = await page.locator(`[data-test="jump-to-move"]`).locator('nth=0');
    await expect(startButton).toHaveText(firstButtonCopy);
  });
});
