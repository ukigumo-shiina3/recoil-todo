import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoListState } from "../atom";

function TodoItemCreator() {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState(""); // 期限用の状態を追加
  // useRecoilState:更新処理
  const setTodoList = useSetRecoilState(todoListState);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  const addItem = () => {
    setTodoList((oldTodoList) => [
      // ...oldTodoList:配列への追加処理
      ...oldTodoList,
      {
        id: getId(),
        title: title,
        isComplete: false,
        deadline: deadline || null, // 期限を設定
      },
    ]);
    setTitle("");
    setDeadline(""); // 期限入力フィールドをリセット
  };

  return (
    <div style={{ margin: "1em 0" }}>
      <input type="text" value={title} onChange={handleChange} placeholder="タスク名" />
      <input type="date" value={deadline} onChange={handleDeadlineChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
}

export default TodoItemCreator;

let id = 1;
function getId() {
  return id++;
}
