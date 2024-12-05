import { createContext, useContext } from "react";

type Props = {
    children: JSX.Element | JSX.Element[]
}

export interface ThemeContext {
    fontFamily?: string;
    fontSize?: 'small' | 'medium' | 'large';
}

const ThemeContext = createContext<ThemeContext>({
    fontFamily: "Roboto",
    fontSize: "small"
})

export default function AppTheme(props: Props) {
    const theme = useContext(ThemeContext)

    return <ThemeContext.Provider value={theme}>
        {props.children}
    </ThemeContext.Provider>
}