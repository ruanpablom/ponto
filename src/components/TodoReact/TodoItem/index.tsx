import { GoCircle, GoCheckCircle, GoTrash } from 'react-icons/go';
import { Dispatch, forwardRef, useCallback } from 'react';
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from 'react-beautiful-dnd';
import { Todo } from '../types';

type TodoItemProps = {
  todo: Todo;
  setTodoList: Dispatch<React.SetStateAction<Todo[]>>;
  className?: string;
  color: 'blue-700' | 'red-700';
} & DraggableProvidedDragHandleProps &
  DraggableProvidedDraggableProps;
export const TodoItem = forwardRef<HTMLLIElement, TodoItemProps>(
  function TodoItem(
    { className, todo, setTodoList, color = 'red-700', ...props },
    ref,
  ): JSX.Element {
    const textVariants = {
      'blue-700': 'text-blue-700',
      'red-700': 'text-red-700',
    };
    const decorationVariants = {
      'blue-700': 'decoration-blue-700',
      'red-700': 'decoration-red-700',
    };
    const concludeTodo = useCallback(() => {
      todo.concluded = !todo.concluded;
      if (todo.concluded) {
        setTodoList(todoList => [
          ...todoList.filter(todoItem => todoItem.id !== todo.id),
          todo,
        ]);
      } else {
        setTodoList(todoList => [
          todo,
          ...todoList.filter(todoItem => todoItem.id !== todo.id),
        ]);
      }
    }, [setTodoList, todo]);

    const deleteTodo = useCallback(() => {
      setTodoList(todoList =>
        todoList.filter(todoItem => todoItem.id !== todo.id),
      );
    }, [setTodoList, todo.id]);

    return (
      <li
        className={`flex gap-2 p-2 w-full bg-white shadowButton rounded items-center line-through ${
          todo.concluded
            ? `line-through ${decorationVariants[color]} opacity-75`
            : ''
        } ${className || ''}`}
        {...props}
        ref={ref}
      >
        <span className={`font-bold text-${color} text-left`}>
          {todo.content}
        </span>
        <div id="buttons-container" className="ml-auto flex gap-2 items-center">
          <button type="button" onClick={concludeTodo}>
            {todo.concluded ? (
              <GoCheckCircle size={20} className={`${textVariants[color]}`} />
            ) : (
              <GoCircle size={20} className={`text-${color}`} />
            )}
          </button>
          <button type="button" onClick={deleteTodo}>
            <GoTrash size={20} className={`text-${color}`} />
          </button>
        </div>
      </li>
    );
  },
);
