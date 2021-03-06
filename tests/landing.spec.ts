import test, { expect, Locator } from "./fixtures";

test.describe.parallel('Given user arrives to a landing page,', () => {
    let title: Locator;
    let logo: Locator;

    test.beforeEach(async ({ page }) => {
        await page.goto('/');

        title = page.locator('.title');
        logo = page.locator('.logo');
    })

    test('when page is visible, then it should match the screenshot visually', async ({ page, isPipeline }) => {
        test.skip(isPipeline(), "Skipped in CI to avoid storing Linux screenshots in this repository.")

        await page.waitForSelector('.app');
        const screenshot = await page.screenshot({ type: 'png' });

        expect(screenshot).toMatchSnapshot('landing.png');
    })

    test('when header becomes visible, then it should contain legible text', async () => {
        await expect(title).toContainText('Hello Vite + React');
    })

    test('when logo becomes visible, then it should contain accessible alternative text', async () => {
        await expect(logo).toHaveAttribute('alt', 'logo');
    })
})
