import { Todo } from '../types';

export const createTodo = (params?: Partial<Todo>): Todo => {
  return {
    id: undefined,
    title: '',
    completed: false,
    ...params,
  };
};
