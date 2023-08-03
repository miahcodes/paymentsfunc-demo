import { describe, it, expect } from "vitest";
import cartTransform from "./index";

describe("cart transform function", () => {
  it("returns NO_CHANGES when cart is empty", () => {
    expect(
      cartTransform({
        cart: {
          lines: [],
        },
      })
    ).toStrictEqual({ operations: [] });
  });
});
