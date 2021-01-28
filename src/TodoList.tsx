import React from 'react';
import {
  ResourceItem,
  ResourceList,
  TextContainer,
  TextStyle,
  Button,
} from '@shopify/polaris';
import { Todo } from './types';

interface Props {
  todos: Todo[];
  toggleTodo: (id?: string) => void;
  selectTodo: (todo: Todo) => void;
  deleteTodo: (id?: string) => void;
}

export const TodoList = ({
  todos,
  toggleTodo,
  selectTodo,
  deleteTodo,
}: Props) => {
  return (
    <ResourceList
      items={todos}
      renderItem={(todo) => {
        const todoState = todo.completed ? 'subdued' : undefined;

        return (
          <>
            <ResourceItem
              id={todo.id || ''}
              onClick={() => selectTodo(todo)}
              shortcutActions={[
                { content: 'Toggle', onAction: () => toggleTodo(todo.id) },
              ]}
            >
              <h3>
                <TextStyle variation={todoState}>{todo.title}</TextStyle>
              </h3>
              <TextContainer>{todo.description}</TextContainer>
            </ResourceItem>
            <Button onClick={() => deleteTodo(todo.id)}>Delete</Button>
          </>
        );
      }}
    />
  );
};
