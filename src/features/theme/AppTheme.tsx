import { createContext, useContext } from "react"

type Props = {
    children: JSX.Element | JSX.Element[]
}

export interface ThemeContext {
    fontFamily?: string
    fontSize?: 'small' | 'medium' | 'large'
    accentColor?: string
    sidebarBg?: string
    titlebarBg?: string
    titlebarHeight?: string
    gridBg?: string
    textColor?: string
    separatorColor?: string
    buttonColor?: string
}

const ThemeContext = createContext<ThemeContext>({
    fontFamily: "Roboto, sans-serif",
    fontSize: "small",
    accentColor: "#aa52bf",
    sidebarBg: "#212426",
    titlebarBg: "#333333",
    titlebarHeight: "40px",
    gridBg: "#222224",
    textColor: "#ffffff",
    separatorColor: "#444444",
    buttonColor: "#444444",
})

export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context
}

export default function AppTheme(props: Props) {
    const theme = useContext(ThemeContext)

    return (
        <ThemeContext.Provider value={theme}>
            <style>
                {`
                :root {
                    --font-family: ${theme.fontFamily};
                    --font-size: ${theme.fontSize === "small" ? "14px" : theme.fontSize === "large" ? "18px" : "16px"};
                    --accent-color: ${theme.accentColor};
                    --sidebar-bg: ${theme.sidebarBg};
                    --titlebar-bg: ${theme.titlebarBg};
                    --titlebar-height: ${theme.titlebarHeight};
                    --grid-bg: ${theme.gridBg};
                    --text-color: ${theme.textColor};
                    --separator-color: ${theme.separatorColor};
                    --button-color: ${theme.buttonColor};
                }

                body, button {
                    font-family: var(--font-family);
                    font-size: var(--font-size);
                    color: var(--text-color);
                }
            `}
            </style>
            {props.children}
        </ThemeContext.Provider>
    )
}