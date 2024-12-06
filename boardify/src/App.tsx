import "./App.css";
import AppTheme from "@/components/AppTheme";
import GraphNode from "@/components/board/GraphNode";
import GraphView from "@/components/board/GraphView";

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
          }} data={""} id={"joe"}>
            <img src="tauri.svg" style={{width: "100%"}}></img>
            <h2>Test</h2>
          </GraphNode>
        </GraphView>
    </AppTheme>
  );
}

export default App;
