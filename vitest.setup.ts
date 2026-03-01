import "@testing-library/jest-dom";
import { mockedAuthClient, mockToast, mockUseRouter } from "./tests/mocks";

vi.mock("next/navigation", () => ({ useRouter: mockUseRouter }));
vi.mock("sonner", () => ({ toast: mockToast }));
vi.mock("@/lib/auth-client", () => ({ authClient: mockedAuthClient }));
