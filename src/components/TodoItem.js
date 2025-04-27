import { useRecoilState } from "recoil";
import { todoListState } from "../atom";
import { useState } from "react"; // useStateを追加

function TodoItem({ item }) {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [deadline, setDeadline] = useState(item.deadline || ""); // 期限編集用

  const deleteItem = () => {
    // findIndex():条件に対して見つかった配列での配列番号を取得
    const index = todoList.findIndex((listItem) => listItem.id === item.id);
    const newTodoList = [
      ...todoList.slice(0, index),
      ...todoList.slice(index + 1),
    ];
    setTodoList(newTodoList);
  };

  const toggleItemCompletion = () => {
    const index = todoList.findIndex((listItem) => listItem.id === item.id);
    const newTodoList = [
      ...todoList.slice(0, index),
      { ...item, isComplete: !item.isComplete },
      ...todoList.slice(index + 1),
    ];
    setTodoList(newTodoList);
  };

  const updateDeadline = () => {
    const index = todoList.findIndex((listItem) => listItem.id === item.id);
    const newTodoList = [
      ...todoList.slice(0, index),
      { ...item, deadline: deadline || null },
      ...todoList.slice(index + 1),
    ];
    setTodoList(newTodoList);
  };

  const isDeadlineNear = () => {
    if (!item.deadline) return false;
    const deadlineDate = new Date(item.deadline);
    const now = new Date();
    const diffTime = deadlineDate - now;
    const diffHours = diffTime / (1000 * 60 * 60);
    return diffHours > 0 && diffHours <= 24;
  };

  const isDeadlinePassed = () => {
    if (!item.deadline) return false;
    const deadlineDate = new Date(item.deadline);
    const now = new Date();
    return deadlineDate < now;
  };

  const getReminderStyle = () => {
    if (isDeadlinePassed()) {
      return { color: "red", fontWeight: "bold" };
    }
    if (isDeadlineNear()) {
      return { color: "orange", fontWeight: "bold" };
    }
    return {};
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", margin: "8px 0", ...getReminderStyle() }}>
      <button onClick={toggleItemCompletion}>
        {item.isComplete ? "完" : "未"}
      </button>

      <span style={{ marginLeft: "8px", flexGrow: 1 }}>{item.title}</span>
      
      {/* 期限表示とリマインダー */}
      {item.deadline && (
        <span style={{ marginRight: "8px" }}>
          期限: {formatDate(item.deadline)}
          {isDeadlineNear() && !item.isComplete && " (まもなく期限です！)"}
          {isDeadlinePassed() && !item.isComplete && " (期限切れです！)"}
        </span>
      )}

      {/* 期限編集フォーム */}
      <input
        type="date"
        value={deadline}
        onChange={handleDeadlineChange}
        style={{ marginRight: "8px" }}
      />
      <button onClick={updateDeadline} style={{ marginRight: "8px" }}>更新</button>
      
      <span onClick={deleteItem} style={{ cursor: "pointer" }}>
        X
      </span>
    </div>
  );
}

export default TodoItem;
