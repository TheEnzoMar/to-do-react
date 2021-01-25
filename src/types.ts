import { TodoForm } from './TodoForm';

export interface Todo {
  id?: string;
  title: string;
  description?: string;
  completed: boolean;
}
