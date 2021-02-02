import React, { useState } from 'react';
import { ResourceList } from '@shopify/polaris';
import { Todo } from './types';
import { TodoListItem } from './TodoListItem';
import { noop } from './utilities';

interface Props {
  todos: Todo[];
  onSelectTodo: (todo: Todo) => void;
  onCompleted: (todo: Todo) => void;
  onDeleteTodo: (todo: Todo) => void;
}

export const TodoList = ({
  todos,
  onSelectTodo,
  onCompleted,
  onDeleteTodo,
}: Props) => {
  return (
    <ResourceList
      items={todos}
      renderItem={(todo) => {
        if (todo.id === undefined) {
          throw Error('TodoList attempted to render a Todo with no ID');
        }

        return (
          <ResourceList.Item id={todo.id} onClick={() => onSelectTodo(todo)}>
            <TodoListItem
              todo={todo}
              onCompleted={() => {
                onCompleted(todo);
              }}
              onDelete={() => {
                onDeleteTodo(todo);
              }}
            />
          </ResourceList.Item>
        );
      }}
    />
  );
};
