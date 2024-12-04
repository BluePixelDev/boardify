import "./App.css";
import BoardView from "./components/board/BoardView";

function App() {
  return (
    <main className="container">
      <BoardView>
        <img src="tauri.svg"></img>
        <h2>Test</h2>
      </BoardView>
    </main>
  );
}

export default App;
