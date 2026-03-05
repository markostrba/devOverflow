// tests/e2e/signin.spec.ts
import { expect, test } from "@playwright/test";
import ROUTES from "@/lib/constants/routes";
import { getTestAuthUtils } from "../helpers/auth-helper";

test.describe("Authentication: Sign out", () => {
  test("should sign out successfully", async ({ context, page }) => {
    const testAuthUtils = await getTestAuthUtils();

    const user = testAuthUtils.createUser({
      username: "testAuthUtils",
    });

    try {
      await testAuthUtils.saveUser(user);

      const cookies = await testAuthUtils.getCookies({
        userId: user.id,
        domain: "localhost",
      });
      await context.addCookies(cookies);
      await page.goto(ROUTES.HOME);

      const profileMenuButton = page.getByRole("button", {
        name: "Open navigation profile menu",
      });
      await profileMenuButton.click({ timeout: 15000 });

      const signOutBtn = page.getByRole("button", { name: /sign out/i });
      await signOutBtn.click();

      await expect(page.getByRole("link", { name: "Sign Up" })).toBeVisible();
      const signInLink = page.getByRole("link", { name: "Sign In" });
      await signInLink.click();
      await expect(page).toHaveURL(ROUTES.SIGN_IN);
    } finally {
      await testAuthUtils.deleteUser(user.id);
    }
  });
});
