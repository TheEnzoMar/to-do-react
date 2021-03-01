import React from 'react';
import { useTodosState } from './hooks/useTodosState';
import { TodosContext } from './TodosContext';
import { BaseProps, Todo } from './types';

interface Props extends BaseProps {
  initialTodos: Todo[];
}

export const TodosProvider = ({ initialTodos, children }: Props) => {
  const context = useTodosState(initialTodos);

  return (
    <TodosContext.Provider value={context}>{children}</TodosContext.Provider>
  );
};
