import { useRecoilState, useRecoilValue } from "recoil";
import { todoListFilterState, todoListState } from "../atom";
import TodoListStats from "./TodoListStats";
import TodoItemCreator from "./TodoItemCreator";
import TodoItem from "./TodoItem";
import { filteredTodoListState } from "../selector";

function TodoList() {
  // useRecoilValue: atomの値のみを取得する。Read Onlyなので状態の取得はできるが更新を行うことはできない
  const todoList = useRecoilValue(filteredTodoListState);
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <h1>RecoilによるTodoアプリ</h1>
      <TodoListStats />
      <select value={filter} onChange={handleChange}>
        <option value="すべて">すべて</option>
        <option value="完了">完了</option>
        <option value="未完了">未完了</option>
      </select>
      <TodoItemCreator />
      {todoList.map((item) => (
        <TodoItem key={item.id} item={item} />
      ))}
    </>
  );
}
export default TodoList;
