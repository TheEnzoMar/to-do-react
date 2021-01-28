import { Todo } from '../types';

export const createTodo = (params?: Partial<Todo>): Todo => {
  console.log('createTodo');
  return {
    id: undefined,
    title: '',
    completed: false,
    ...params,
  };
};
