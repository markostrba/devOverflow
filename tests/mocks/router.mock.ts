const mockRouter = {
  replace: jest.fn(),
  push: jest.fn(),
  prefetch: jest.fn(),
  refresh: jest.fn(),
  forward: jest.fn(),
  back: jest.fn(),
};

const mockUseRouter = jest.fn().mockReturnValue(mockRouter);

export { mockUseRouter, mockRouter };
