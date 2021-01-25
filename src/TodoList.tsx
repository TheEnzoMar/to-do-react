import React from 'react';
import { ResourceItem, ResourceList, TextStyle } from '@shopify/polaris';
import { Todo } from './types';

interface Props {
  todos: Todo[];
  toggleTodo: (id?: string) => void;
}

export const TodoList = ({ todos, toggleTodo }: Props) => {
  return (
    <ResourceList
      items={todos}
      renderItem={(todo) => {
        const todoState = todo.completed ? 'negative' : undefined;

        return (
          <ResourceItem
            id={todo.id || ''}
            onClick={() => {}}
            shortcutActions={[
              { content: 'Toggle', onAction: () => toggleTodo(todo.id) },
            ]}
          >
            <h3>
              <TextStyle variation={todoState}>{todo.title}</TextStyle>
            </h3>
          </ResourceItem>
        );
      }}
    />
  );
};
