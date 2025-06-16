import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "./Modal";
import { vi } from "vitest";

describe("Modal", () => {
  it("renders the title when provided", () => {
    render(<Modal title="Test Title">Content</Modal>);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders children content", () => {
    render(<Modal>Test Content</Modal>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders close button and triggers onClose", () => {
    const onCloseMock = vi.fn();
    render(
      <Modal title="Close Test" onClose={onCloseMock}>
        Content
      </Modal>
    );

    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    const { container } = render(
      <Modal className="custom-class">Content</Modal>
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
