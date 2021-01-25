import React, { useState } from 'react';
import { Card, Layout, Page } from '@shopify/polaris';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { Todo } from './types';

export const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const createTodo = (todo: Todo) => {
    const nextId = new Date().getTime().toString();
    const newToDos = [
      ...todos,
      {
        ...todo,
        id: nextId,
      },
    ];

    setTodos(newToDos);
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
    }

    // set state
    setTodos(newTodos);
  };

  return (
    <Page title="Todos">
      <Layout>
        <Layout.Section secondary>
          <Card sectioned>
            <TodoForm onSubmit={createTodo} />
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card sectioned>
            <TodoList todos={todos} toggleTodo={toggleTodo} />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};
