import { GoTrash } from 'react-icons/go';
import { Dispatch, forwardRef, useCallback } from 'react';
import { Todo } from '../types';

type TodoItemProps = {
  todo: Todo;
  setTodoList: Dispatch<React.SetStateAction<Todo[]>>;
  className?: string;
  color: 'blue-700' | 'red-700';
};
export const TodoItem = forwardRef<HTMLLIElement, TodoItemProps>(
  function TodoItem(
    { className, todo, setTodoList, color = 'red-700', ...props },
    ref,
  ): JSX.Element {
    const decorationVariants = {
      'blue-700': 'decoration-blue-700',
      'red-700': 'decoration-red-700',
    };

    const deleteTodo = useCallback(() => {
      setTodoList(todoList =>
        todoList.filter(todoItem => todoItem.id !== todo.id),
      );
    }, [setTodoList, todo.id]);

    return (
      <li
        className={`flex gap-2 p-2 w-full bg-white shadowButton rounded items-center ${
          todo.concluded
            ? `line-through ${decorationVariants[color]} opacity-75`
            : ''
        } ${className || ''}`}
        {...props}
        ref={ref}
      >
        <div className="flex flex-col gap-2 w-full">
          <div className="flex">
            <span className={`font-bold text-${color} text-left`}>
              {todo.content}
            </span>
            <div
              id="buttons-container"
              className="ml-auto flex gap-2 items-center"
            >
              <button type="button" onClick={deleteTodo}>
                <GoTrash size={20} className={`text-${color}`} />
              </button>
            </div>
          </div>
          <span className={`text-xs text-${color} self-end`}>
            {new Date(todo.time).toLocaleString('pt-BR', {})}
          </span>
        </div>
      </li>
    );
  },
);
