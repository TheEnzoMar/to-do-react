import React, { useState } from 'react';
import { Card, Layout, Page } from '@shopify/polaris';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { Todo } from './types';

export const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const createTodo = (todo: Todo) => {
    const newToDos = [...todos, todo];
    setTodos(newToDos);
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
            <TodoList todos={todos} />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};
