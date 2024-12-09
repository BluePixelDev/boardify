import "./App.css";
import AppTheme from "@/components/AppTheme";
import GraphNode from "@/components/graph/GraphNode";
import GraphView from "@/components/graph/GraphView";

function App() {
  return (
    <AppTheme>
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
  );
}

export default App;
