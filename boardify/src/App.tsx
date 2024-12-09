import "./App.css";
import AppTheme from "@/components/theme/AppTheme";
import MainView from "./views/MainView";
import Snippets from "./components/snippets/AppSnippets";
import { Provider } from "react-redux";
import DragProvider from "./hooks/DragProvider";
import store from "./store"

function App() {
  return (
    <Provider store={store}>
      <AppTheme>
        <Snippets/>
        <DragProvider>
          <MainView />
        </DragProvider>
      </AppTheme>
    </Provider>
  );
}

export default App;
