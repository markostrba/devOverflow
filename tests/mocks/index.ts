export * from "./auth-client.mock";
export * from "./router.mock";
export * from "./toast.mock";

export const resetAllMocks = () => {
  vi.clearAllMocks();
};
