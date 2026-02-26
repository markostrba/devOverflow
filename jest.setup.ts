import "@testing-library/jest-dom";
import { mockedAuthClient, mockToast, mockUseRouter } from "./tests/mocks";

jest.mock("next/navigation", () => ({ useRouter: mockUseRouter }));
jest.mock("sonner", () => ({ toast: mockToast }));
jest.mock("@/lib/auth-client", () => ({ authClient: mockedAuthClient }));
