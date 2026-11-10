import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as api from "../src/api";
import type { Note } from "../src/api";
import { App } from "../src/App";

// Replace the real API module, so these tests never touch the network.
vi.mock("../src/api");

function makeNote(id: string, title: string, body = ""): Note {
  const now = "2026-01-01T00:00:00.000Z";
  return { id, title, body, createdAt: now, updatedAt: now };
}

describe("App", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(api.listNotes).mockResolvedValue([]);
  });

  it("loads and shows the existing notes", async () => {
    vi.mocked(api.listNotes).mockResolvedValue([makeNote("1", "Milk")]);

    render(<App />);

    expect(
      await screen.findByRole("heading", { name: "Milk" }),
    ).toBeInTheDocument();
  });

  it("adds a new note to the list", async () => {
    const user = userEvent.setup();
    vi.mocked(api.createNote).mockResolvedValue(makeNote("2", "Bread"));
    render(<App />);
    await screen.findByText(/No notes yet/);

    await user.type(screen.getByLabelText("Title"), "Bread");
    await user.click(screen.getByRole("button", { name: "Add note" }));

    expect(api.createNote).toHaveBeenCalledWith({ title: "Bread", body: "" });
    expect(
      await screen.findByRole("heading", { name: "Bread" }),
    ).toBeInTheDocument();
  });

  it("edits a note", async () => {
    // TODO
  });

  it("removes a deleted note from the list", async () => {
    // TODO
  });

  it("shows an error when the notes cannot be loaded", async () => {
    // TODO
  });
});
