import { useRecoilValue } from "recoil";
import { todoListStatsState } from "../selector";

function TodoListStats() {
  const { totalNum, totalCompletedNum, totalUncompletedNum, nearDeadlineNum, passedDeadlineNum } =
    useRecoilValue(todoListStatsState);
  return (
    <ul>
      <li>Todoの登録数:{totalNum}</li>
      <li>完了の数:{totalCompletedNum}</li>
      <li>未完了の数:{totalUncompletedNum}</li>
      <li style={{ color: "orange", fontWeight: nearDeadlineNum > 0 ? "bold" : "normal" }}>
        期限間近のTodo:{nearDeadlineNum}
      </li>
      <li style={{ color: "red", fontWeight: passedDeadlineNum > 0 ? "bold" : "normal" }}>
        期限切れのTodo:{passedDeadlineNum}
      </li>
    </ul>
  );
}

export default TodoListStats;
