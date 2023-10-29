import { useEffect, useState } from 'react';
import { Todo } from './types';
import { TodoInput } from './TodoInput';
import { TodoList } from './TodoList';

type TodoReactProps = {
  color?: 'blue-700' | 'red-700';
};

export function TodoReact({ color = 'red-700' }: TodoReactProps): JSX.Element {
  const [todoList, setTodoList] = useState<Todo[]>(
    localStorage.getItem('todoList')
      ? JSON.parse(localStorage.getItem('todoList') as string)
      : [],
  );

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div id="todo-container" className="w-full">
      <TodoInput color={color} setTodoList={setTodoList} />
      <TodoList color={color} todos={todoList} setTodoList={setTodoList} />
    </div>
  );
}
