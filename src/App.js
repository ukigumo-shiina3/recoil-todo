import "./App.css";
import { RecoilRoot } from "recoil";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div style={{ margin: "2em" }}>
      <RecoilRoot>
        <TodoList />
      </RecoilRoot>
    </div>
  );
}

export default App;
