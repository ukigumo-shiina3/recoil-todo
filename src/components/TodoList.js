import { useRecoilValue } from "recoil";
import { todoListState } from "../atom";
import { todoListStatsState } from "../selector";

function TodoList() {
  // useRecoilValue: atomの値のみを取得する。Read Onlyなので状態の取得はできるが更新を行うことはできない
  const todoList = useRecoilValue(todoListState);
  const totalNum = useRecoilValue(todoListStatsState);
  return (
    <>
      <h1>RecoilによるTodoアプリ</h1>
      <ul>
        <li>Todoの登録数:{totalNum}</li>
      </ul>
      {todoList.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </>
  );
}

export default TodoList;
