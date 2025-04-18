import AppTheme from "@/features/theme/AppTheme"
import { store } from "@store"
import { Provider } from "react-redux"
import "./App.css"

import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'
import { AppLayout } from "./AppLayout"
import Editor from "./Routes/Editor"
import Home from "./Routes/Home"
import { ContextMenuProvider } from "./features/app/context-menu"

function App() {

  return (
    <Provider store={store}>
      <ContextMenuProvider>
        <AppTheme>
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
        </AppTheme>
      </ContextMenuProvider>
    </Provider>
  )
}

export default App
