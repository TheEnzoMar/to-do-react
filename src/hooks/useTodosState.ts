import { useState } from 'react';
import { createTodo } from '../factory';
import { Todo } from '../types';

interface NewTodoPromise {
  success: boolean;
}

interface UpdateTodoPromise {
  success: boolean;
}

interface DeleteTodoPromise {
  success: boolean;
  id: string;
}

export const useTodosState = (initialTodos: Todo[] = []) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const newTodo = (todo: Todo): Promise<NewTodoPromise> => {
    return new Promise((resolve, reject) => {
      const newTodo = createTodo({
        ...todo,
        id: new Date().getTime().toString(),
      });

      const newToDos = [...todos, newTodo];
      setTodos(newToDos);
      resolve({ success: true });
    });
  };

  const updateTodo = (todo: Todo): Promise<UpdateTodoPromise> => {
    return new Promise((resolve, reject) => {
      const newTodos = [...todos];

      let todoToUpdate = newTodos.find((t) => t.id === todo.id);
      if (todoToUpdate) {
        Object.assign(todoToUpdate, todo);
        setTodos(newTodos);
        resolve({ success: true });
      }

      reject({ success: false, error: 'No Todo to update was found' });
    });
  };

  const deleteTodo = (id?: string): Promise<DeleteTodoPromise> => {
    return new Promise((resolve, reject) => {
      if (!id) {
        reject({ success: false, error: 'No ID provide' });
      } else {
        const newTodos = [...todos];
        const index = newTodos.findIndex((todo) => todo.id === id);
        newTodos.splice(index, 1);
        setTodos(newTodos);

        resolve({ success: true, id: id });
      }
    });
  };

  return {
    todos,
    newTodo,
    updateTodo,
    deleteTodo,
  };
};
