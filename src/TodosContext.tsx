import React, { useContext } from 'react';
import {
  DeleteTodoPromise,
  NewTodoPromise,
  UpdateTodoPromise,
  useTodosState,
} from './hooks/useTodosState';
import { Todo } from './types';
import { Nullable } from './types';
import { noop } from './utilities';

interface ITodoContext {
  todos: Todo[];
  newTodo: (todo: Todo) => Promise<NewTodoPromise>;
  updateTodo: (todo: Todo) => Promise<UpdateTodoPromise>;
  deleteTodo: (id?: string) => Promise<DeleteTodoPromise>;
}

export const TodosContext = React.createContext<Nullable<ITodoContext>>(null);

export const useTodoContext = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw Error('TodoContext Provider is NULL');
  }

  return context;
};
