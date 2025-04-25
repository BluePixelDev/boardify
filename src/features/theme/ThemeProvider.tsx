import React, { createContext, useContext } from "react";
import tinycolor from "tinycolor2";

type ThemeProviderProps = {
  children: React.ReactNode;
  value?: ThemeContext;
};

export interface ThemeContext {
  //Text properties
  fontFamily?: string;
  textColor?: string;
  fontSize?: "small" | "medium" | "large";

  // Titlebar properties
  titlebarBg?: string;
  titlebarHeight?: string;

  // Grid properties
  gridBg?: string;
  accentColor?: string;
  sidebarBg?: string;
  separatorColor?: string;
  buttonColor?: string;
}

const defaultTheme: ThemeContext = {
  fontFamily: "Roboto, sans-serif",
  fontSize: "small",
  accentColor: "#aa52bf",
  sidebarBg: "#212426",
  titlebarBg: "#333333",
  titlebarHeight: "40px",
  gridBg: "#222224",
  textColor: "#ffffff",
  separatorColor: "#444444",
  buttonColor: "#434547",
};

const ThemeContext = createContext<ThemeContext>(defaultTheme);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export default function ThemeProvider({ children, value }: ThemeProviderProps) {
  const theme = { ...defaultTheme, ...value };
  const buttonHover = tinycolor(theme.buttonColor).lighten(10).toHexString();
  const buttonActive = tinycolor(theme.buttonColor).darken(10).toHexString();
  const accentHover = tinycolor(theme.accentColor).lighten(10).toHexString();
  const accentActive = tinycolor(theme.accentColor).darken(10).toHexString();

  const textColorDisabled = tinycolor(theme.textColor)
    .setAlpha(0.5)
    .toRgbString();

  return (
    <ThemeContext.Provider value={theme}>
      <style>
        {`
          :root {
            --font-family: ${theme.fontFamily};
            --font-size: ${theme.fontSize === "small" ? "14px" : theme.fontSize === "large" ? "18px" : "16px"};
            --accent-color: ${theme.accentColor};
            --accent-color-hover: ${accentHover};
            --accent-color-active: ${accentActive};

            /*---- Button Styles ----*/
            --button-color: ${theme.buttonColor};
            --button-color-hover: ${buttonHover};
            --button-color-active: ${buttonActive};

            --sidebar-bg: ${theme.sidebarBg};
            --titlebar-bg: ${theme.titlebarBg};
            --titlebar-height: ${theme.titlebarHeight};
            --grid-bg: ${theme.gridBg};
            --separator-color: ${theme.separatorColor};
            --button-color: ${theme.buttonColor};
                    
            --text-color: ${theme.textColor};
            --text-color-disabled: ${textColorDisabled};
          }
        `}
      </style>
      {children}
    </ThemeContext.Provider>
  );
}
