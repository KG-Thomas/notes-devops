import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { NoteForm } from "../src/components/NoteForm";

describe("NoteForm", () => {
  it("submits the trimmed title and body", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<NoteForm submitLabel="Add note" onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Title"), "  Milk ");
    await user.type(screen.getByLabelText("Body"), "Two pints");
    await user.click(screen.getByRole("button", { name: "Add note" }));

    expect(onSubmit).toHaveBeenCalledWith({ title: "Milk", body: "Two pints" });
  });

  it("shows an error and does not submit when the title is empty", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<NoteForm submitLabel="Add note" onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button", { name: "Add note" }));

    expect(screen.getByRole("alert")).toHaveTextContent("Title is required");
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("clears the fields after a new note is submitted", async () => {
    // TODO
  });

  it("starts with the values of the note being edited", () => {
    // TODO
  });

  it("calls onCancel when Cancel is clicked", async () => {
    // TODO
  });
});
