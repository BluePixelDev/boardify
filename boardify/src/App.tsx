import "./App.css";
import AppTheme from "@/components/theme/AppTheme";
import GraphNode from "@/components/graph/GraphNode";
import GraphView from "@/components/graph/GraphView";
import Snippets from "./components/snippets/AppSnippets";
import { Provider } from "react-redux";
import store from "./store"

function App() {
  return (
    <Provider store={store}>
      <AppTheme>
        <Snippets/>
        <GraphView graph={{
          maxZoom: 5,
          minZoom: 0.5
        }}>
          <GraphNode position={{
            x: -10,
            y: 0
          }} size={{
            x: 250,
            y: 250
          }}>
          </GraphNode>
        </GraphView>
      </AppTheme>
    </Provider>
  );
}

export default App;
