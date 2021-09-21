import test, { expect, Locator } from "@playwright/test";

test.describe('Given a user is on a landing page,', () => {
    let counter: Locator;
    let title: Locator;
    let logo: Locator;

    test.beforeEach(async ({ page }) => {
        await page.goto('/');

        counter = page.locator('.counter');
        title = page.locator('.title');
        logo = page.locator('.logo');
    })

    test('when header is visible, then it should contain legible text', async () => {
        await expect(title).toContainText('Hello Vite + React');
    })


    test('when logo is visible, then it should contain alternative text for accessibility reasons', async () => {
        await expect(logo).toHaveAttribute('alt', 'logo');
    })

    test('when counter is visible, then it should display zero clicks', async () => {
        await expect(counter).toContainText('count is: 0');
    })

    test('when they click the counter, then it should update', async () => {
        await counter.click();

        await expect(counter).toContainText('count is: 1');
    })

    test('when they double-click the counter, then it should update', async () => {
        await counter.dblclick();

        await expect(counter).toContainText('count is: 2');
    })

    test('when they refresh page after clicking the counter, then it should reset', async ({ page }) => {
        await counter.click();
        await expect(counter).toContainText('count is: 1');

        await page.reload();
        await expect(counter).toContainText('count is: 0');
    })

})