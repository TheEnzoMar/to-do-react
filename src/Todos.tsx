import React, { useState, useCallback } from 'react';
import { Card, Layout, Page, Toast } from '@shopify/polaris';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { createTodo } from './factory';
import { Optional, Todo } from './types';
import { DeleteTodoModal } from './DeleteTodoModal';

interface DeleteTodoModalState {
  open: boolean;
  todoId?: string;
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
    todoId: undefined,
  });
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

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

  const toggleTodo = (id?: string) => {
    const newTodos = [...todos];

    // find todo by id
    const todo = newTodos.find(
      (todo) => todo.id !== undefined && todo.id === id
    );

    // update todo (w. immutability)
    if (todo) {
      todo.completed = !todo.completed;

      if (selectedTodo?.id === todo.id) {
        setSelectedTodo({ ...todo });
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

  const deleteTodo = (id?: string) => {
    if (!id) {
      return;
    }

    const newTodos = [...todos];
    const index = newTodos.findIndex((todo) => todo.id === id);
    newTodos.splice(index, 1);
    setTodos(newTodos);
    setSelectedTodo(undefined);
    closeDeleteTodoModal();

    setToastNotifications([...toastNotifications, id]);
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
              toggleTodo={toggleTodo}
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
        primaryAction={() => deleteTodo(deleteModal.todoId)}
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
