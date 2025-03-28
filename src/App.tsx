import "./App.css";
import AppTheme from "@/features/app/theme/AppTheme";
import CSSSnippets from "./features/app/snippets/CSSSnippets";
import { Provider } from "react-redux";
import store from "./redux/store"
import { Titlebar } from "./features/app/titlebar";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Home from "./Routes/Home";
import Editor from "./Routes/Editor";
import { MenuContextProvider } from "./features/app/context-menu/MenuContextProvider";
import { ToolbarProvider } from "./features/app/titlebar/context/ToolbarProvider";
import AppSetup from "./components/AppSetup";

function App() {

  return (
    <Provider store={store}>
      <MenuContextProvider>
        <ToolbarProvider>
          <AppSetup />

          {/* Routing */}
          <Router>

            {/* Styling */}
            <AppTheme>
              <CSSSnippets />

              {/* Components */}
              <Titlebar />
              <Routes>
                {/*TODO: Remove default redirect*/}
                <Route path="/" element={<Navigate to="/editor" replace />} />
                <Route path="/  " element={<Home />} />
                <Route path="/editor" element={<Editor />} />
              </Routes>

            </AppTheme>
          </Router>

        </ToolbarProvider>
      </MenuContextProvider>
    </Provider>
  );
}

export default App;
