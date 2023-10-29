import { useEffect, useMemo, useState } from 'react';
import { useTodos } from '@/contexts/todos';
import { TodoInput } from './TodoInput';
import { TodoList } from './TodoList';

type TodoReactProps = {
  color?: 'blue-700' | 'red-700';
};

export function TodoReact({ color = 'red-700' }: TodoReactProps): JSX.Element {
  const { todos: todoList, setTodos: setTodoList } = useTodos();
  const [initialDate, setInitialDate] = useState<Date>(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  });
  const [finalDate, setFinalDate] = useState<Date>(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date;
  });

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  const todos = useMemo(() => {
    return todoList.filter(todo => {
      const time = new Date(todo.time).getTime();
      const initialD = new Date(initialDate).getTime();
      const finalD = new Date(finalDate).getTime();
      console.info(initialD, finalD, time);
      return initialD < time && time < finalD;
    });
  }, [finalDate, initialDate, todoList]);

  return (
    <div id="todo-container" className="flex flex-col w-full gap-2">
      <TodoInput color={color} setTodoList={setTodoList} />
      <div className="flex gap-2 justify-between">
        <div className="flex gap-1">
          <label htmlFor="date">De:</label>
          <input
            id="intial-date"
            className="bg-white text-black pl-1 pr-1"
            type="date"
            defaultValue={initialDate?.toISOString().split('T')[0]}
            onChange={el => setInitialDate(new Date(el.target.value))}
          />
        </div>
        <div className="flex gap-1">
          <label htmlFor="date">Até:</label>
          <input
            id="final-date"
            className="bg-white text-black pl-1 pr-1"
            type="date"
            defaultValue={finalDate?.toISOString().split('T')[0]}
            onChange={el => setFinalDate(new Date(el.target.value))}
          />
        </div>
      </div>

      <TodoList color={color} todos={todos} setTodoList={setTodoList} />
    </div>
  );
}
