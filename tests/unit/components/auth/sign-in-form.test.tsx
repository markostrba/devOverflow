import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Link from "next/link";
import { toast } from "sonner";
import { AuthCard } from "@/components/auth/auth-card";
import SignInForm from "@/components/auth/sign-in-form";
import ROUTES from "@/lib/constants/routes";
import { mockedAuthClient, mockRouter, resetAllMocks } from "@/tests/mocks";

describe("SignIn AuthForm", () => {
  const setup = () => {
    const user = userEvent.setup();

    const utils = render(
      <AuthCard
        title="Welcome Back"
        description="Sign In to continue to DevOverflow"
        footer={
          <span className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href={ROUTES.SIGN_UP}
              className="font-semibold text-accent hover:opacity-80"
            >
              Sign Up
            </Link>
          </span>
        }
      >
        <SignInForm />
      </AuthCard>,
    );
    const getInputs = () => ({
      email: screen.getByLabelText(/email/i),
      password: screen.getByLabelText("Password"),
    });
    const submitBtn = screen.getByRole("button", { name: /sign in/i });
    return { ...utils, user, getInputs, submitBtn };
  };

  beforeEach(() => {
    resetAllMocks();
  });

  describe("Rendering", () => {
    it("should render all fields and the sign-up link", () => {
      const { getInputs } = setup();
      const inputs = getInputs();

      expect(inputs.email).toBeInTheDocument();
      expect(inputs.password).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /sign up/i })).toHaveAttribute(
        "href",
        ROUTES.SIGN_UP,
      );
    });
  });

  describe("Validation Feedback", () => {
    it("should show errors for empty fields on submit", async () => {
      const { submitBtn, user } = setup();
      await user.click(submitBtn);

      // We only check for a few to prove the connection to Zod is working
      expect(
        await screen.findByText(/Please enter a valid email address/i),
      ).toBeInTheDocument();
      expect(
        await screen.findByText(/Password must be at least 8 characters long/i),
      ).toBeInTheDocument();

      expect(mockedAuthClient.signIn.email).not.toHaveBeenCalled();
    });
  });

  describe("Submission Flow", () => {
    it("should disable the submit button and show loading state during submission", async () => {
      // Mock a slow response

      mockedAuthClient.signIn.email.mockReturnValue(new Promise(() => {}));

      const { getInputs, submitBtn, user } = setup();
      const inputs = getInputs();

      await user.type(inputs.email, "test@example.com");
      await user.type(inputs.password, "Password123!");

      await user.click(submitBtn);

      expect(submitBtn).toBeDisabled();
      expect(screen.getByText(/sign in/i)).toBeInTheDocument();
      expect(getInputs().email).toBeDisabled();
    });

    it("should redirect and toast on success", async () => {
      mockedAuthClient.signIn.email.mockResolvedValue({
        data: {},
        error: null,
      });
      const { getInputs, submitBtn, user } = setup();
      const inputs = getInputs();

      await user.type(inputs.email, "test@example.com");
      await user.type(inputs.password, "Password123!");
      await user.click(submitBtn);

      await waitFor(() => {
        expect(mockedAuthClient.signIn.email).toHaveBeenCalledWith({
          email: "test@example.com",
          password: "Password123!",
        });
        expect(toast.success).toHaveBeenCalledWith("Signed in successfully.");
        expect(mockRouter.push).toHaveBeenCalledWith("/");
      });
    });

    it("should show error toast if the API fails", async () => {
      (mockedAuthClient.signIn.email as jest.Mock).mockResolvedValue({
        data: null,
        error: { message: "Auth error" },
      });

      const { getInputs, submitBtn, user } = setup();
      const inputs = getInputs();

      await user.type(inputs.email, "error@test.com");
      await user.type(inputs.password, "Password123!");
      await user.click(submitBtn);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalled();
        expect(toast.success).not.toHaveBeenCalled();
        expect(mockRouter.push).not.toHaveBeenCalled();
      });
    });
  });

  describe("Password Validation", () => {
    it("should toggle password visibility when clicking the eye icon", async () => {
      const { getInputs, user } = setup();
      const inputs = getInputs();

      const passwordToggleVisibility = screen.getByRole("button", {
        name: /show password/i,
      });

      await user.click(passwordToggleVisibility);

      expect(inputs.password).toHaveAttribute("type", "text");
      expect(passwordToggleVisibility).toHaveAccessibleName(/hide password/i);
    });
  });
});
