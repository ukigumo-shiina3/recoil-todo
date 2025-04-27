import { selector } from "recoil";
import { todoListFilterState, todoListState } from "./atom";

export const todoListStatsState = selector({
  key: "todoListStatsState",
  get: ({ get }) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    // filter関数を利用してisCompleteプロパティがtrueの完了済みのitemのみ取得してlengthで配列の大きさを計算
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    // totalNumからtotalCompletedNumを引いて未完了のitemの数を取得
    const totalUncompletedNum = totalNum - totalCompletedNum;
    
    const nearDeadlineNum = todoList.filter((item) => {
      if (!item.deadline || item.isComplete) return false;
      const deadlineDate = new Date(item.deadline);
      const now = new Date();
      const diffTime = deadlineDate - now;
      const diffHours = diffTime / (1000 * 60 * 60);
      return diffHours > 0 && diffHours <= 24;
    }).length;
    
    const passedDeadlineNum = todoList.filter((item) => {
      if (!item.deadline || item.isComplete) return false;
      const deadlineDate = new Date(item.deadline);
      const now = new Date();
      return deadlineDate < now;
    }).length;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      nearDeadlineNum,
      passedDeadlineNum,
    };
  },
});

export const filteredTodoListState = selector({
  key: "filteredTodoListState",
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case "完了":
        return list.filter((item) => item.isComplete);
      case "未完了":
        return list.filter((item) => !item.isComplete);
      case "期限間近":
        return list.filter((item) => {
          if (!item.deadline || item.isComplete) return false;
          const deadlineDate = new Date(item.deadline);
          const now = new Date();
          const diffTime = deadlineDate - now;
          const diffHours = diffTime / (1000 * 60 * 60);
          return diffHours > 0 && diffHours <= 24;
        });
      case "期限切れ":
        return list.filter((item) => {
          if (!item.deadline || item.isComplete) return false;
          const deadlineDate = new Date(item.deadline);
          const now = new Date();
          return deadlineDate < now;
        });
      default:
        return list;
    }
  },
});
