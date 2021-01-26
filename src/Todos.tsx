import React, { useState } from 'react';
import { Card, Layout, Page } from '@shopify/polaris';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { createTodo } from './factory';
import { Todo } from './types';

export const Todos = () => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>(undefined);
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

  const clearTodo = () => {
    setSelectedTodo(undefined);
  };

  return (
    <Page title="Todos">
      <Layout>
        <Layout.Section secondary>
          <Card sectioned>
            <TodoForm
              selectedTodo={selectedTodo}
              onClear={clearTodo}
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
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};
