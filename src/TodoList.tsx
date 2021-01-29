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
  toggleTodo: (id?: string) => void;
  selectTodo: (todo: Todo) => void;
  deleteTodo: (id?: string) => void;
  activeModal: boolean;
  setActiveModal: (active: boolean) => void;
  activeToast: boolean;
  setActiveToast: (activeToast: boolean) => void;
}

export const TodoList = ({
  todos,
  toggleTodo,
  selectTodo,
  deleteTodo,
  activeModal,
  setActiveModal,
  activeToast,
  setActiveToast,
}: Props) => {
  const toggleModal = () => {
    setActiveModal(!activeModal);
  };
  const deleteTodoButton = <Button onClick={toggleModal}>Delete</Button>;

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
            <Frame>
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
                open={activeModal}
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
              {deleteToastMarkup}
            </Frame>
          </>
        );
      }}
    />
  );
};
