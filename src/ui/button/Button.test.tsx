import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";
import { vi } from "vitest";

describe("Button", () => {
  it("Button Has Label", () => {
    render(<Button label="Testing Label" />);
    expect(screen.getByText("Testing Label")).toBeInTheDocument();
  });

  it("Button Click Event", () => {
    const onClick = vi.fn();
    render(<Button label="Button" onClick={onClick} />);
    fireEvent.click(screen.getByText("Button"));
    expect(onClick).toHaveBeenCalled();
  });

  it("Button Has Custom Classnames", () => {
    const tesClasses = ["test1", "test2", "test3"];
    render(<Button label="Button" className={tesClasses.join(" ")} />);
    const button = screen.getByRole("button");
    expect(tesClasses.every((x) => button.classList.contains(x)));
  });

  it("Button Type Class", () => {
    render(<Button label="Button" type="submit" />);
    const button = screen.getByRole("button");
    expect(button.classList.contains("accent"));
  });
});
