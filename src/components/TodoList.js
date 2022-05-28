import { atom, useRecoilValue } from "recoil";

const todoListState = atom({
  key: "todoListState",
  default: [
    {
      id: 0,
      title: "メール送信",
      isComplete: false,
    },
  ],
});

function TodoList() {
  // useRecoilValue: atomの値のみを取得する。Read Onlyなので状態の取得はできるが更新を行うことはできない
  const todoList = useRecoilValue(todoListState);
  return (
    <>
      <h1>RecoilによるTodoアプリ</h1>
      {todoList.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </>
  );
}

export default TodoList;
