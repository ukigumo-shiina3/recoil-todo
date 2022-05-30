import { useRecoilState } from "recoil";
import { todoListState } from "../atom";

function TotoItem({ item }) {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const deleteItem = () => {
    // findIndex():条件に対して見つかった配列での配列番号を取得
    const index = todoList.findIndex((listItem) => listItem.id === item.id);
    const newTodoList = [
      ...todoList.slice(0, index),
      ...todoList.slice(index + 1),
    ];
    setTodoList(newTodoList);
  };

  return (
    <div>
      {item.title}
      <span onClick={deleteItem} style={{ cursor: "pointer" }}>
        X
      </span>
    </div>
  );
}

export default TotoItem;
