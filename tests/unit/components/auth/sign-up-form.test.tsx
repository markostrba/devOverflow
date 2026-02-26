import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Link from "next/link";
import { toast } from "sonner";
import { AuthCard } from "@/components/auth/auth-card";
import { SignUpForm } from "@/components/auth/sign-up-form";
import ROUTES from "@/lib/constants/routes";
import { mockedAuthClient, mockRouter, resetAllMocks } from "@/tests/mocks";

const user = userEvent.setup();

describe("SignUp AuthForm", () => {
  const setup = () => {
    const utils = render(
      <AuthCard
        title="Create account"
        description="Join the DevOverflow community"
        footer={
          <span className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-accent hover:opacity-80"
            >
              Sign In
            </Link>
          </span>
        }
      >
        <SignUpForm />
      </AuthCard>,
    );
    const getInputs = () => ({
      email: screen.getByLabelText(/email/i),
      username: screen.getByLabelText(/username/i),
      name: screen.getByLabelText(/full name/i),
      password: screen.getByLabelText("Password"),
    });
    const submitBtn = screen.getByRole("button", { name: /create/i });
    return { ...utils, getInputs, submitBtn };
  };

  beforeEach(() => {
    resetAllMocks();
  });

  describe("Rendering", () => {
    it("should render all fields and the sign-in link", () => {
      const { getInputs } = setup();
      const inputs = getInputs();

      expect(inputs.email).toBeInTheDocument();
      expect(inputs.username).toBeInTheDocument();
      expect(inputs.name).toBeInTheDocument();
      expect(inputs.password).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /sign in/i })).toHaveAttribute(
        "href",
        ROUTES.SIGN_IN,
      );
    });
  });

  describe("Validation Feedback", () => {
    it("should show errors for empty fields on submit", async () => {
      const { submitBtn } = setup();
      await user.click(submitBtn);

      // We only check for a few to prove the connection to Zod is working
      expect(
        await screen.findByText(/Please enter a valid email address/i),
      ).toBeInTheDocument();
      expect(
        await screen.findByText(/username must be at least 3 characters/i),
      ).toBeInTheDocument();
      expect(
        await screen.findByText(
          /Full name must be at least 3 characters long./i,
        ),
      ).toBeInTheDocument();
      expect(
        await screen.findByText(/Password must be at least 8 characters long/i),
      ).toBeInTheDocument();

      expect(mockedAuthClient.signUp.email).not.toHaveBeenCalled();
    });

    it("should show specific regex errors (UI integration)", async () => {
      const { getInputs, submitBtn } = setup();
      const inputs = getInputs();

      await user.type(inputs.username, "user@invalid"); // invalid char
      await user.click(submitBtn);

      expect(
        await screen.findByText(/Use only letters, numbers, or underscores/i),
      ).toBeInTheDocument();
    });
  });

  describe("Submission Flow", () => {
    it("should disable the submit button and show loading state during submission", async () => {
      // Mock a slow response

      mockedAuthClient.signUp.email.mockReturnValue(new Promise(() => {}));

      const { getInputs, submitBtn } = setup();
      const inputs = getInputs();

      await user.type(inputs.email, "test@example.com");
      await user.type(inputs.username, "testuser");
      await user.type(inputs.name, "John Doe");
      await user.type(inputs.password, "Password123!");

      await user.click(submitBtn);

      expect(submitBtn).toBeDisabled();
      expect(screen.getByText(/creating account/i)).toBeInTheDocument();
      expect(getInputs().email).toBeDisabled();
    });

    it("should redirect and toast on success", async () => {
      mockedAuthClient.signUp.email.mockResolvedValue({
        data: {},
        error: null,
      });
      const { getInputs, submitBtn } = setup();
      const inputs = getInputs();

      await user.type(inputs.email, "test@example.com");
      await user.type(inputs.username, "testuser");
      await user.type(inputs.name, "John Doe");
      await user.type(inputs.password, "Password123!");
      await user.click(submitBtn);

      await waitFor(() => {
        expect(mockedAuthClient.signUp.email).toHaveBeenCalledWith({
          name: "John Doe",
          username: "testuser",
          email: "test@example.com",
          password: "Password123!",
        });
        expect(toast.success).toHaveBeenCalledWith(
          "Your account has been created successfully.",
        );
        expect(mockRouter.push).toHaveBeenCalledWith("/");
      });
    });

    it("should show error toast if the API fails", async () => {
      (mockedAuthClient.signUp.email as jest.Mock).mockResolvedValue({
        data: null,
        error: { message: "Auth error" },
      });

      const { getInputs, submitBtn } = setup();
      const inputs = getInputs();

      await user.type(inputs.email, "error@test.com");
      await user.type(inputs.username, "tester");
      await user.type(inputs.name, "Tester");
      await user.type(inputs.password, "Password123!");
      await user.click(submitBtn);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalled();
      });
    });
  });
});
