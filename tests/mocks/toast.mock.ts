export const mockToast = Object.assign(jest.fn(), {
  success: jest.fn(),
  info: jest.fn(),
  warning: jest.fn(),
  error: jest.fn(),
  loading: jest.fn(),
});
