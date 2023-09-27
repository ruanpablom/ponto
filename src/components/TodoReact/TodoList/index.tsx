import { Dispatch } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';

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
  const handleDrop = (droppedItem: DropResult) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;

    setTodoList(todoList => {
      const updatedList = [...todoList];

      const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
      updatedList.splice(droppedItem.destination!.index, 0, reorderedItem);

      return updatedList;
    });
  };

  return (
    <DragDropContext onDragEnd={handleDrop}>
      <Droppable droppableId="list-container">
        {provided => (
          <ul
            className="flex flex-col gap-3 list-container"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {todos.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {provided => (
                  <TodoItem
                    className="item-container"
                    todo={item}
                    setTodoList={setTodoList}
                    color={color}
                    ref={provided.innerRef}
                    {...provided.dragHandleProps!}
                    {...provided.draggableProps!}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
    // <ul className="flex flex-col gap-3">
    //   {todos.map(todo => (
    //     <TodoItem key={todo.id} todo={todo} setTodoList={setTodoList} />
    //   ))}
    // </ul>
  );
}
