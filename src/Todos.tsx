import React, { useState } from 'react';
import { Card, Layout, Page, Toast } from '@shopify/polaris';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { createTodo } from './factory';
import { Optional, Todo } from './types';
import { DeleteTodoModal } from './DeleteTodoModal';

interface DeleteTodoModalState {
  open: boolean;
  todo?: Todo;
}

const initialTodos = [
  createTodo({
    id: new Date().getTime().toString(),
    title: 'Think',
    description: 'Think about the problem...',
    completed: false,
  }),
  createTodo({
    id: (new Date().getTime() + 2).toString(),
    title: 'Explore',
    description: 'Explore options...',
    completed: false,
  }),
  createTodo({
    id: (new Date().getTime() + 3).toString(),
    title: 'Build',
    description: 'Build it...',
    completed: false,
  }),
];

export const Todos = () => {
  const [selectedTodo, setSelectedTodo] = useState<Optional<Todo>>(undefined);
  const [toastNotifications, setToastNotifications] = useState<string[]>([]);
  const [deleteModal, setDeleteModal] = useState<DeleteTodoModalState>({
    open: false,
  });
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  // state logic

  const newTodo = (todo: Todo) => {
    const newTodo = createTodo({
      ...todo,
      id: new Date().getTime().toString(),
    });

    const newToDos = [...todos, newTodo];

    setTodos(newToDos);
  };

  const updateTodo = (todo: Todo) => {
    const newTodos = [...todos];

    let todoToUpdate = newTodos.find((t) => t.id === todo.id);
    if (todoToUpdate) {
      Object.assign(todoToUpdate, todo);
      setTodos(newTodos);
      setSelectedTodo(undefined);
    }
  };

  const toggleTodo = (todo: Todo) => {
    const newTodos = [...todos];

    // find todo by id
    const todoToUpdate = newTodos.find(
      (t) => t.id !== undefined && t.id === todo.id
    );

    // update todo (w. immutability)
    if (todoToUpdate) {
      todoToUpdate.completed = !todoToUpdate.completed;

      if (selectedTodo?.id === todoToUpdate.id) {
        setSelectedTodo({ ...todoToUpdate });
      }
    }

    // set state
    setTodos(newTodos);
  };

  const createOrUpdateTodo = (todo: Todo) => {
    if (todo.id === undefined) {
      newTodo(todo);
    }

    updateTodo(todo);
  };

  const selectTodo = (todo: Todo) => {
    setSelectedTodo({ ...todo });
  };

  const deleteTodo = (todo: Todo) => {
    if (!todo.id) {
      return;
    }

    const newTodos = [...todos];
    const index = newTodos.findIndex((t) => t.id === todo.id);
    newTodos.splice(index, 1);
    setTodos(newTodos);
    setSelectedTodo(undefined);
    closeDeleteTodoModal();

    setToastNotifications([...toastNotifications, todo.id]);
  };

  const closeDeleteTodoModal = () => {
    setDeleteModal({
      open: false,
      todo: undefined,
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
              onSelectTodo={selectTodo}
              onCompleted={(todo) => {
                toggleTodo(todo);
              }}
              onDeleteTodo={(todo) => {
                setDeleteModal({
                  open: true,
                  todo: todo,
                });
              }}
            />
          </Card>
        </Layout.Section>
      </Layout>
      <DeleteTodoModal
        open={deleteModal.open}
        onClose={() => closeDeleteTodoModal()}
        primaryAction={() => {
          if (deleteModal.todo) {
            deleteTodo(deleteModal.todo);
          }
        }}
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
