import { useRecoilValue } from "recoil";
import { todoListState } from "../atom";
import TodoListStats from "./TodoListStats";
import TodoItemCreator from "./TodoItemCreator";

function TodoList() {
  // useRecoilValue: atomの値のみを取得する。Read Onlyなので状態の取得はできるが更新を行うことはできない
  const todoList = useRecoilValue(todoListState);

  return (
    <>
      <h1>RecoilによるTodoアプリ</h1>
      <TodoListStats />
      <TodoItemCreator />
      {todoList.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </>
  );
}
export default TodoList;
