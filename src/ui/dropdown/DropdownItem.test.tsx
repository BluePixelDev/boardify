import { render, screen, fireEvent } from "@testing-library/react";
import DropdownItem from "./DropdownItem";

describe("DropdownItem", () => {
  it("should render with the label", () => {
    render(<DropdownItem label="Test Item" />);
    expect(screen.getByText("Test Item")).toBeInTheDocument();
  });

  it("should open submenu on click if there are children", () => {
    render(
      <DropdownItem label="Test Item">
        <div>Submenu</div>
      </DropdownItem>
    );
    fireEvent.click(screen.getByText("Test Item"));
    expect(screen.getByText("Submenu")).toBeInTheDocument();
  });

  it("should close submenu on outside click", () => {
    render(
      <>
        <DropdownItem label="Test Item">
          <div>Submenu</div>
        </DropdownItem>
        <div>Outside</div>
      </>
    );
    fireEvent.click(screen.getByText("Test Item"));
    expect(screen.getByText("Submenu")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Outside"));
    expect(screen.queryByText("Submenu")).not.toBeInTheDocument();
  });

  it("should open submenu on 'Enter' key press", () => {
    render(
      <DropdownItem label="Test Item">
        <div>Submenu</div>
      </DropdownItem>
    );
    fireEvent.keyDown(screen.getByText("Test Item"), { key: "Enter" });
    expect(screen.getByText("Submenu")).toBeInTheDocument();
  });

  it("should close submenu on 'Escape' key press", () => {
    render(
      <DropdownItem label="Test Item">
        <div>Submenu</div>
      </DropdownItem>
    );
    fireEvent.click(screen.getByText("Test Item"));
    expect(screen.getByText("Submenu")).toBeInTheDocument();
    fireEvent.keyDown(screen.getByText("Test Item"), { key: "Escape" });
    expect(screen.queryByText("Submenu")).not.toBeInTheDocument();
  });
});
