/* eslint-disable react/jsx-no-constructed-context-values */
import { Todo } from '@/components/TodoReact/types';
import { createContext, useContext, useState } from 'react';

type TodosProviderProps = {
  children: JSX.Element;
};

type TodosContextData = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodosContext = createContext<TodosContextData>({} as TodosContextData);

function TodosProvider({ children }: TodosProviderProps): JSX.Element {
  const [todos, setTodos] = useState<TodosContextData['todos']>(
    JSON.parse(localStorage.getItem('todoList') || '[]'),
  );

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
}

const useTodos = (): TodosContextData => useContext(TodosContext);

export { TodosProvider, useTodos };
