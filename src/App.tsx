import { store } from "@/redux";
import "./App.css";

import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { AppLayout } from "./AppLayout";
import Editor from "./Routes/Editor";
import Home from "./Routes/Home";
import { ContextMenuProvider } from "./ui/context-menu";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <ContextMenuProvider>
        <AppLayout>
          <Router>
            <Routes>
              {/*TODO: Remove default redirect*/}
              <Route path="/" element={<Navigate to="/editor" replace />} />
              <Route path="/  " element={<Home />} />
              <Route path="/editor" element={<Editor />} />
            </Routes>
          </Router>
        </AppLayout>
      </ContextMenuProvider>
    </Provider>
  );
}

export default App;
