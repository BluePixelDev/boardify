import "./App.css";
import AppTheme from "@/features/theme/AppTheme";
import MainView from "./views/MainView";
import AppSnippets from "./features/app-snippets/AppSnippets";
import { Provider } from "react-redux";
import DragProvider from "./shared/context/DragProvider";
import store from "./store"

function App() {
  return (
    <Provider store={store}>
      <AppTheme>
        <AppSnippets />
        <DragProvider>
          <MainView />
        </DragProvider>
      </AppTheme>
    </Provider>
  );
}

export default App;
