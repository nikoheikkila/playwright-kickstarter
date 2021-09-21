import test, { expect, Locator } from "@playwright/test";

test.describe('Given there is a counter on landing page,', () => {
    let counter: Locator;

    const expectCounterValueToBe = async (expected: number) => {
        await expect(counter).toContainText(`count is: ${expected}`);
    }

    test.beforeEach(async ({ page }) => {
        await page.goto('/');

        counter = page.locator('.counter');
    })

    test('when counter is visible, then it should display zero clicks', async () => {
        await expectCounterValueToBe(0);
    })

    test('when they click the counter, then it should update', async () => {
        await counter.click();

        await expectCounterValueToBe(1);
    })

    test('when they double-click the counter, then it should update', async () => {
        await counter.dblclick();

        await expectCounterValueToBe(2);
    })

    test('when they refresh page after clicking the counter, then it should reset', async ({ page }) => {
        await counter.click();
        await expectCounterValueToBe(1);

        await page.reload();
        await expectCounterValueToBe(0);
    })
})
