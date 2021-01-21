import React, { useState } from "react";
import { Card, Layout, List, Page } from "@shopify/polaris";
import { ToDo } from "./types";
import { ToDoForm } from "./ToDoForm";

export const ToDosList = () => {
  const [todos, setTodos] = useState<ToDo[]>([
    {
      title: "First ToDo"
    }
  ]);

  const createToDo = (todo: ToDo) => {
    const newToDos = [...todos, todo];
    setTodos(newToDos);
  };

  return (
    <Page title="To Dos">
      <Layout sectioned>
        <Card sectioned>
          <ToDoForm onSubmit={createToDo} />
        </Card>
        <Card sectioned>
          <List>
            {todos.map((todo, i) => {
              return <List.Item key={i}>{todo.title}</List.Item>;
            })}
          </List>
        </Card>
      </Layout>
    </Page>
  );
};
