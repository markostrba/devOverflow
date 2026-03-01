const mockRouter = {
  replace: vi.fn(),
  push: vi.fn(),
  prefetch: vi.fn(),
  refresh: vi.fn(),
  forward: vi.fn(),
  back: vi.fn(),
};

const mockUseRouter = vi.fn().mockReturnValue(mockRouter);

export { mockUseRouter, mockRouter };
