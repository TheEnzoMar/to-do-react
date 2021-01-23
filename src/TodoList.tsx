import React, { useState } from 'react';
import { List } from '@shopify/polaris';
import { Todo } from './types';

interface Props {
  todos: Todo[];
}

export const TodoList = ({ todos }: Props) => {
  return (
    <List>
      {todos.map((todo, i) => {
        return <List.Item key={i}>{todo.title}</List.Item>;
      })}
    </List>
  );
};
