import React, { useState, useCallback } from 'react';
import { Card, Layout, Page } from '@shopify/polaris';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { createTodo } from './factory';
import { Optional, Todo } from './types';

export const Todos = () => {
  const [selectedTodo, setSelectedTodo] = useState<Optional<Todo>>(undefined);
  const [activeModal, setActiveModal] = useState(false);
  const [activeToast, setActiveToast] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([
    createTodo({
      id: '1',
      title: 'Create app',
      description: 'Testing...',
      completed: false,
    }),
  ]);

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
    const newActiveModal = activeModal;
    setActiveModal(!newActiveModal);
    const newActiveToast = activeToast;
    setActiveToast(!newActiveToast);
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
              deleteTodo={deleteTodo}
              activeModal={activeModal}
              setActiveModal={setActiveModal}
              activeToast={activeToast}
              setActiveToast={setActiveToast}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};
