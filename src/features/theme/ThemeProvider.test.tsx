import { render, screen } from "@testing-library/react";
import ThemeProvider, { useTheme } from "./ThemeProvider";

const TestComponent = () => {
  const theme = useTheme();
  return (
    <div data-testid="theme-consumer">
      <span>{theme.fontFamily}</span>
    </div>
  );
};

describe("ThemeProvider", () => {
  it("renders children properly", () => {
    render(
      <ThemeProvider>
        <div data-testid="child">Hello</div>
      </ThemeProvider>
    );
    expect(screen.getByTestId("child")).toHaveTextContent("Hello");
  });

  it("provides default theme values", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme-consumer")).toHaveTextContent("Roboto");
  });

  it("overrides theme values with custom values", () => {
    render(
      <ThemeProvider value={{ fontFamily: "Arial" }}>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme-consumer")).toHaveTextContent("Arial");
  });

  it("applies CSS variables correctly", () => {
    render(
      <ThemeProvider value={{ fontSize: "large" }}>
        <div />
      </ThemeProvider>
    );

    const styleTag = document.querySelector("style")!;
    expect(styleTag.innerHTML).toContain("--font-size: 18px");
    expect(styleTag.innerHTML).toContain("--font-family: Roboto, sans-serif"); // still default
  });
});
