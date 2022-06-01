import { selector } from "recoil";
import { todoListState } from "./atom";

export const todoListStatsState = selector({
  key: "todoListStatsState",
  get: ({ get }) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    // filter関数を利用してisCompleteプロパティがtrueの完了済みのitemのみ取得してlengthで配列の大きさを計算
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    // totalNumからtotalCompletedNumを引いて未完了のitemの数を取得
    const totalUncompletedNum = totalNum - totalCompletedNum;
    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
    };
  },
});
