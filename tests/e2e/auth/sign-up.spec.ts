import { expect, test } from "@playwright/test";
import ROUTES from "@/lib/constants/routes";
import {
  cleanupTestUser,
  EXISTING_TEST_USER,
  TEST_USER,
} from "../helpers/auth-helper";

test.describe("Sign Up flow", async () => {
  test("should register a new user and redirect to home", async ({ page }) => {
    const { fullName, email, username, password } = TEST_USER;

    // Go to Sign Up page
    await page.goto(ROUTES.SIGN_UP);

    // Fill Sign Up form
    const safeFill = async (label: string, value: string) => {
      const field = page.getByRole("textbox", { name: label });
      await field.click();
      await field.fill(value);
    };
    await safeFill("Full Name", fullName);
    await safeFill("Username", username);
    await safeFill("Email", email);
    await safeFill("Password", password);

    await page.getByRole("button", { name: "Create account" }).click();

    const profileMenuButton = page.getByRole("button", {
      name: "Open navigation profile menu",
    });
    await profileMenuButton.waitFor({ state: "visible", timeout: 15000 });
    await expect(profileMenuButton).toBeVisible();

    await expect(page.getByRole("link", { name: "Sign In" })).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Sign Up" })).toHaveCount(0);

    await cleanupTestUser(email);
  });
  test("should show error for existing email", async ({ page }) => {
    await page.goto(ROUTES.SIGN_UP);
    const { fullName, username, password } = TEST_USER;

    // Assuming the user from the previous test exists (or seed one)
    const safeFill = async (label: string, value: string) => {
      const field = page.getByRole("textbox", { name: label });
      await field.click();
      await field.fill(value);
    };
    await safeFill("Full Name", fullName);
    await safeFill("Username", username);
    await safeFill("Email", EXISTING_TEST_USER.email);
    await safeFill("Password", password);

    await page.getByRole("button", { name: /create account/i }).click();

    await expect(page.getByText(/account already exists/i)).toBeVisible();
  });
});
