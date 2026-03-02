import { APIError } from "better-auth";
import { db } from "@/db/client";
import { generateUniqueUsername } from "@/lib/utils/auth/generate-username";
import { createMockUser } from "@/tests/mocks/user";

vi.mock("@/db/client", () => ({
  db: {
    query: {
      user: {
        findFirst: vi.fn(),
      },
    },
  },
}));

describe("generateUsername Util", () => {
  afterEach(() => {
    // This wipes the slate clean after every 'it' block
    vi.resetAllMocks();
  });

  it("returns null if username exists", async () => {
    const user = createMockUser({ username: "existing_john" });
    const result = await generateUniqueUsername(user);

    expect(result).toBeNull();
    expect(db.query.user.findFirst).not.toHaveBeenCalled();
  });

  it("returns username if first attempt is free", async () => {
    const user = createMockUser();

    vi.mocked(db.query.user.findFirst).mockResolvedValue(undefined);

    const result = await generateUniqueUsername(user);

    expect(result).toMatch(/^user\d{6}$/);
    expect(db.query.user.findFirst).toHaveBeenCalledTimes(1);
  });

  it("retries on collision", async () => {
    const existingUser = createMockUser({ username: "existing_john" });
    const user = createMockUser();

    const spy = vi.mocked(db.query.user.findFirst);

    spy
      .mockResolvedValueOnce(existingUser) // 1st call: name taken
      .mockResolvedValueOnce(undefined); // 2nd call: name free

    const result = await generateUniqueUsername(user);

    expect(result).toMatch(/^user\d{6}$/);
    expect(db.query.user.findFirst).toHaveBeenCalledTimes(2);
  });

  it("throws after 5 attempts", async () => {
    const existingUser = createMockUser({ username: "existing_john" });

    vi.mocked(db.query.user.findFirst).mockResolvedValue(existingUser);

    existingUser.username = "";

    await expect(generateUniqueUsername(existingUser)).rejects.toThrow(
      APIError,
    );

    // This will now correctly be 5, because the count started at 0
    expect(db.query.user.findFirst).toHaveBeenCalledTimes(5);
  });
});
