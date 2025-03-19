import "./App.css";
import "./utils/appSetup"
import AppTheme from "@/features/theme/AppTheme";
import CSSSnippets from "./features/snippets/CSSSnippets";
import { Provider } from "react-redux";
import store from "./redux/store"
import { Titlebar } from "./features/titlebar";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Home from "./Routes/Home";
import Editor from "./Routes/Editor";

function App() {

  return (
    <Provider store={store}>
      <Router>
        <AppTheme>

          <CSSSnippets />
          <Titlebar />
          <Routes>
            {/*TODO: Remove default redirect*/}
            <Route path="/" element={<Navigate to="/editor" replace />} />
            <Route path="/  " element={<Home />} />
            <Route path="/editor" element={<Editor />} />
          </Routes>

        </AppTheme>
      </Router>
    </Provider>
  );
}

export default App;
