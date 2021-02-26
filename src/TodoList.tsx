import React from 'react';
import {
  ResourceList,
  ResourceItem,
  TextContainer,
  TextStyle,
} from '@shopify/polaris';
import { Todo } from './types';
import { useTodosState } from './hooks/useTodosState';

interface Props {
  todos: Todo[];
  onDeleteTodo: (id?: string) => void;
  toggleTodo: (id?: string) => void;
  selectTodo: (todo: Todo) => void;
}

export const TodoList = ({
  todos,
  toggleTodo,
  selectTodo,
  onDeleteTodo,
}: Props) => {
  return (
    <ResourceList
      items={todos}
      renderItem={(todo) => {
        const todoState = todo.completed ? 'subdued' : undefined;

        return (
          <ResourceItem
            id={todo.id || ''}
            onClick={() => selectTodo(todo)}
            shortcutActions={[
              { content: 'Delete', onAction: () => onDeleteTodo(todo.id) },
              { content: 'Toggle', onAction: () => toggleTodo(todo.id) },
            ]}
          >
            <h3>
              <TextStyle variation={todoState}>{todo.title}</TextStyle>
            </h3>
            <TextContainer>{todo.description}</TextContainer>
          </ResourceItem>
        );
      }}
    />
  );
};
