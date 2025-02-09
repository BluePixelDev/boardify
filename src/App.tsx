import "./App.css";
import AppTheme from "@/features/theme/AppTheme";
import MainView from "./views/MainView";
import AppSnippets from "./features/snippets/AppSnippets";
import { Provider } from "react-redux";
import store from "./redux/store"

function App() {
  return (
    <Provider store={store}>
      <AppTheme>
        <AppSnippets />
          <MainView />
      </AppTheme>
    </Provider>
  );
}

export default App;
