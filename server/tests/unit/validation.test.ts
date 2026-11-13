import { describe, expect, it } from "vitest";
import {
  MAX_BODY_LENGTH,
  MAX_TITLE_LENGTH,
  validateNoteInput,
} from "../../src/validation";
import { title } from "process";

describe("validateNoteInput", () => {
  it("accepts a title and body and trims both", () => {
    const result = validateNoteInput({ title: "  Milk ", body: " Two pints " });

    expect(result).toEqual({
      ok: true,
      value: { title: "Milk", body: "Two pints" },
    });
  });

  it("defaults a missing body to an empty string", () => {
    const result = validateNoteInput({ title: "Milk" });

    expect(result).toEqual({ ok: true, value: { title: "Milk", body: "" } });
  });

  it.each([
    undefined,
    null,
    {},
    { title: "" },
    { title: "   " },
    { title: 42 },
  ])("rejects %j because the title is missing", (payload) => {
    const result = validateNoteInput(payload);

    expect(result).toEqual({ ok: false, errors: ["Title is required"] });
  });

  it("rejects a title that is too long", () => {
    // TODO
    const result = validateNoteInput({
      title: "a".repeat(MAX_TITLE_LENGTH + 1),
    });
    expect(result).toEqual({
      ok: false,
      errors: ["Title must be 100 characters or fewer"],
    });
  });

  it("accepts a title of exactly the maximum length", () => {
    // TODO
    const title = "a".repeat(MAX_TITLE_LENGTH);

    const result = validateNoteInput({ title });
    expect(result).toEqual({ ok: true, value: { title, body: "" } });
  });

  it("rejects a body that is not text", () => {
    // TODO
    const result = validateNoteInput({ title: "Milk", body: 42 });
    expect(result).toEqual({ ok: false, errors: ["Body must be text"] });
  });

  it("rejects a body that is too long", () => {
    // TODO
    const result = validateNoteInput({
      title: "Milk",
      body: "a".repeat(MAX_BODY_LENGTH + 1),
    });
    expect(result).toEqual({
      ok: false,
      errors: ["Body must be 2000 characters or fewer"],
    });
  });

  it("reports every problem at once", () => {
    // TODO
    const result = validateNoteInput({ title: "", body: 42 });

    expect(result).toEqual({
      ok: false,
      errors: ["Title is required", "Body must be text"],
    });
  });
});
