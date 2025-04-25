import "@/App.css";
import type { GlobalProvider } from "@ladle/react";
import { Provider as StoreProvider } from "react-redux";
import { store } from "@/store";
import { ThemeProvider } from "@/features/theme";

export const Provider: GlobalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <>
    <StoreProvider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </StoreProvider>
  </>
);
