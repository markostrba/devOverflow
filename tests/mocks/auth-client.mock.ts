export const mockedAuthClient = {
  signUp: {
    email: vi.fn(),
  },
  signIn: {
    email: vi.fn(),
    social: vi.fn(),
  },
};
