import "./App.css";
import AppTheme from "@/features/app/theme/AppTheme";
import CSSSnippets from "./features/snippets/CSSSnippets";
import { Provider } from "react-redux";
import { store } from "@store"
import { Titlebar } from "./features/app/titlebar";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Home from "./Routes/Home";
import Editor from "./Routes/Editor";
import { ToolbarProvider } from "./features/app/titlebar/context/ToolbarProvider";
import AppSetup from "./features/app/AppSetup";
import { ContextMenuProvider } from "./features/app/context-menu";
import { NotificationOverlay } from "./features/notifications";
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <Provider store={store}>
      <ContextMenuProvider>
        <ToolbarProvider>
          <AppSetup />
          <NotificationOverlay />
          <ToastContainer />

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
      </ContextMenuProvider>
    </Provider>
  );
}

export default App;
