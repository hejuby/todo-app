import { test, expect } from "@playwright/test";

const TODO_DATA = {
    title: `${performance.now()} is title`,
};

test("should be able to add todo", async ({ page }) => {
    await page.goto("/");

    await page.getByPlaceholder("Add title").fill(TODO_DATA.title);

    await page.getByText("Add").click();

    await page.waitForTimeout(3000);

    await expect(page.getByText(TODO_DATA.title)).toBeVisible();
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
