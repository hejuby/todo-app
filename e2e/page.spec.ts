import { test, expect } from "@playwright/test";

const TODO_DATA = {
    title: `${performance.now()}-${Math.random()}`,
};

// Testing todo add, complete and delete
test("should be able to add todo", async ({ page }) => {
    await page.goto("/");

    await page.getByPlaceholder("Add title").fill(TODO_DATA.title);

    await page.getByTestId("form-submit").click();

    await page.waitForTimeout(3000);

    await expect(page.getByText(TODO_DATA.title)).toBeAttached();
});

test("should be able to complete todo", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId(`${TODO_DATA.title} complete`).click();

    await page.waitForTimeout(3000);

    await expect(page.getByTestId(`${TODO_DATA.title} complete`)).toBeChecked();
});

test("should be able to delete todo", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId(`${TODO_DATA.title} delete`).click();

    await page.waitForTimeout(3000);

    await expect(page.getByText(TODO_DATA.title)).not.toBeVisible();
});

// Testing todo add with invalid value
test("should not be able to add todo with invalid value", async ({ page }) => {
    await page.goto("/");

    const invalidCases = [
        {
            title: `${performance.now()} is title`,
            priority: 6,
        },
        {
            title: `${performance.now()} is title`,
            priority: -1,
        },
    ];

    await Promise.all(
        invalidCases.map(async (testCase) => {
            await Promise.all(
                Object.entries(testCase).map(async ([key, value]) =>
                    page.getByTestId(`add-${key}`).fill(`${value}`)
                )
            );

            await page.getByTestId("form-submit").click();

            await page.waitForTimeout(3000);

            await expect(page.getByText(testCase.title)).not.toBeAttached();
        })
    );
});
