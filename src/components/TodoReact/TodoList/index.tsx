import { Dispatch } from 'react';

import { TodoItem } from '../TodoItem';
import { Todo } from '../types';

type TodoListProps = {
  todos: Todo[];
  setTodoList: Dispatch<React.SetStateAction<Todo[]>>;
  color: 'blue-700' | 'red-700';
};

export function TodoList({
  todos,
  setTodoList,
  color = 'red-700',
}: TodoListProps): JSX.Element {
  return (
    <ul className="flex flex-col gap-3 list-container">
      {todos.length > 0 ? (
        todos.map(item => (
          <TodoItem
            key={item.id}
            className="item-container"
            todo={item}
            setTodoList={setTodoList}
            color={color}
          />
        ))
      ) : (
        <></>
      )}
    </ul>
  );
}
