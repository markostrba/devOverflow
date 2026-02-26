import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "sonner";
import { SocialAuth } from "@/components/auth/social-auth";
import { mockedAuthClient, resetAllMocks } from "@/tests/mocks";

const user = userEvent.setup();

describe("SocialAuth Component", () => {
  beforeEach(() => {
    resetAllMocks();
  });

  it("renders GitHub and Google buttons", () => {
    render(<SocialAuth />);
    expect(screen.getByRole("button", { name: /github/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /google/i })).toBeInTheDocument();
  });

  it("calls authClient with correct provider on click", async () => {
    mockedAuthClient.signIn.social = jest.fn().mockResolvedValue({});
    render(<SocialAuth />);

    const githubBtn = screen.getByRole("button", { name: /github/i });
    const googleBtn = screen.getByRole("button", { name: /google/i });

    await user.click(githubBtn);
    expect(mockedAuthClient.signIn.social).toHaveBeenCalledWith({
      provider: "github",
    });

    await user.click(googleBtn);
    expect(mockedAuthClient.signIn.social).toHaveBeenCalledWith({
      provider: "google",
    });
  });

  it("disables buttons while signing in and re-enables them after", async () => {
    let resolvePromise: (value: unknown) => void;

    // Create a controlled promise
    mockedAuthClient.signIn.social.mockReturnValue(
      new Promise((resolve) => {
        resolvePromise = resolve;
      }),
    );

    render(<SocialAuth />);
    const githubBtn = screen.getByRole("button", { name: /github/i });
    const googleBtn = screen.getByRole("button", { name: /google/i });

    await user.click(githubBtn);
    expect(githubBtn).toBeDisabled();
    expect(googleBtn).toBeDisabled();

    await act(async () => {
      resolvePromise(jest.fn);
    });

    // 3. Verify "Idle" state
    expect(githubBtn).toBeEnabled();
    expect(googleBtn).toBeEnabled();
  });

  it("shows error toast on sign-in failure", async () => {
    mockedAuthClient.signIn.social = jest
      .fn()
      .mockRejectedValue(new Error("Fail"));

    render(<SocialAuth />);
    const githubBtn = screen.getByRole("button", { name: /github/i });

    await user.click(githubBtn);
    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(
        "Failed to sign in. Please try again.",
      ),
    );
  });
});
