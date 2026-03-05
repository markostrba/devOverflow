// tests/e2e/signin.spec.ts
import { expect, test } from "@playwright/test";
import ROUTES from "@/lib/constants/routes";
import { EXISTING_TEST_USER, getAuthFieldFill } from "../helpers/auth-helper";

test.describe("Authentication: Sign In", () => {
  test("should login with valid credentials", async ({ page }) => {
    const { email, password } = EXISTING_TEST_USER;
    const safeFill = getAuthFieldFill(page);

    await page.goto(ROUTES.SIGN_IN);

    await safeFill("Email", email);
    await safeFill("Password", password);

    await page.getByRole("button", { name: /sign in/i }).click();

    const profileMenuButton = page.getByRole("button", {
      name: "Open navigation profile menu",
    });
    await profileMenuButton.waitFor({ state: "visible", timeout: 15000 });
    await expect(profileMenuButton).toBeVisible();
  });
});
