import React from 'react';
import {
  ResourceItem,
  ResourceList,
  TextContainer,
  TextStyle,
  Button,
  Modal,
} from '@shopify/polaris';
import { Todo } from './types';

interface Props {
  todos: Todo[];
  toggleTodo: (id?: string) => void;
  selectTodo: (todo: Todo) => void;
  deleteTodo: (id?: string) => void;
  active: boolean;
  setActive: (active: boolean) => void;
}

export const TodoList = ({
  todos,
  toggleTodo,
  selectTodo,
  deleteTodo,
  active,
  setActive,
}: Props) => {
  const toggleModal = () => {
    setActive(!active);
  };
  const deleteTodoButton = <Button onClick={toggleModal}>Delete</Button>;

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
            <Modal
              activator={deleteTodoButton}
              open={active}
              onClose={toggleModal}
              title="Are you sure you want to delete your todo item?"
              primaryAction={{
                content: 'Confirm Delete',
                onAction: () => deleteTodo(todo.id),
              }}
              secondaryActions={[
                {
                  content: 'Cancel',
                  onAction: toggleModal,
                },
              ]}
            />
          </>
        );
      }}
    />
  );
};
