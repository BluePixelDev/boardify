import "./App.css";
import AppTheme from "@/components/AppTheme";
import MainView from "./views/MainView";
import DragProvider from "./hooks/DragProvider";

function App() {
  return (
    <AppTheme>
      <DragProvider>
        <MainView />
      </DragProvider>
    </AppTheme>
  );
}

export default App;
