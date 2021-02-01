import React from 'react';
import {
  ResourceItem,
  ResourceList,
  TextContainer,
  TextStyle,
  Button,
  Modal,
  Frame,
  Toast,
} from '@shopify/polaris';
import { Todo } from './types';

interface Props {
  todos: Todo[];
  onDeleteTodo: (id?: string) => void;
  toggleTodo: (id?: string) => void;
  selectTodo: (todo: Todo) => void;
  activeToast: boolean;
  setActiveToast: (activeToast: boolean) => void;
}

export const TodoList = ({
  todos,
  toggleTodo,
  selectTodo,
  onDeleteTodo,
  activeToast,
  setActiveToast,
}: Props) => {
  const toggleToast = () => {
    setActiveToast(!activeToast);
  };

  const deleteToastMarkup = activeToast ? (
    <Toast content="Message sent" onDismiss={toggleToast} />
  ) : null;

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
            <Button onClick={() => onDeleteTodo(todo.id)}>Delete</Button>
            {deleteToastMarkup}
          </>
        );
      }}
    />
  );
};
