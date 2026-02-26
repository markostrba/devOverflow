export const mockedAuthClient = {
  signUp: {
    email: jest.fn(),
  },
  signIn: {
    email: jest.fn(),
    social: jest.fn(),
  },
};
