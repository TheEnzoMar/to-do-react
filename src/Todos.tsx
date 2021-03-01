import React, { useState } from 'react';
import { Card, Layout, Page, Toast } from '@shopify/polaris';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { Optional, Todo } from './types';
import { DeleteTodoModal } from './DeleteTodoModal';
import { useTodoContext } from './TodosContext';

interface DeleteTodoModalState {
  open: boolean;
  todoId?: string;
}

interface Props {}

export const Todos = ({}: Props) => {
  const { todos, newTodo, updateTodo, deleteTodo } = useTodoContext();

  const [selectedTodo, setSelectedTodo] = useState<Optional<Todo>>(undefined);
  const [toastNotifications, setToastNotifications] = useState<string[]>([]);
  const [deleteModal, setDeleteModal] = useState<DeleteTodoModalState>({
    open: false,
    todoId: undefined,
  });

  const createOrUpdateTodo = async (todo: Todo) => {
    if (todo.id === undefined) {
      const { success } = await newTodo(todo);
      if (success) {
        return;
      }
    } else {
      const { success } = await updateTodo(todo);
      if (success) {
        setSelectedTodo(undefined);
      }
    }
  };

  const handleTodoDelete = async (todoId?: string) => {
    try {
      const { success, id } = await deleteTodo(todoId);

      if (success) {
        setSelectedTodo(undefined);
        closeDeleteTodoModal();
        setToastNotifications([...toastNotifications, id]);
      }
    } catch ({ success, error }) {
      setSelectedTodo(undefined);
      closeDeleteTodoModal();
      console.log({ success, error });
    }
  };

  const selectTodo = (todo: Todo) => {
    setSelectedTodo({ ...todo });
  };

  const toggleTodo = (todoId?: string) => {
    if (!todoId) {
      return;
    }

    const todo = todos.find((t) => t.id === todoId);
    if (todo) {
      updateTodo({ ...todo, completed: !todo?.completed });
    }
  };

  const closeDeleteTodoModal = () => {
    setDeleteModal({
      open: false,
      todoId: undefined,
    });
  };

  const dismissNotification = (id: string) => {
    const notifications = [...toastNotifications];
    const index = notifications.indexOf(id);

    notifications.splice(index, 1);
    setToastNotifications(notifications);
  };

  return (
    <Page title="Todos">
      <Layout>
        <Layout.Section secondary>
          <Card sectioned>
            <TodoForm
              selectedTodo={selectedTodo}
              onSubmit={createOrUpdateTodo}
            />
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card sectioned>
            <TodoList
              todos={todos}
              toggleTodo={(id) => toggleTodo(id)}
              selectTodo={selectTodo}
              onDeleteTodo={(id) => {
                setDeleteModal({
                  open: true,
                  todoId: id,
                });
              }}
            />
          </Card>
        </Layout.Section>
      </Layout>
      <DeleteTodoModal
        open={deleteModal.open}
        onClose={() => closeDeleteTodoModal()}
        primaryAction={() => handleTodoDelete(deleteModal.todoId)}
        secondaryAction={() => closeDeleteTodoModal()}
      />
      {toastNotifications.map((id) => {
        const removeToast = () => {
          dismissNotification(id);
        };

        return (
          <Toast
            key={id}
            content="Deleted Todo!"
            duration={3000}
            onDismiss={removeToast}
          />
        );
      })}
    </Page>
  );
};
