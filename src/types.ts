export type Optional<T> = T | undefined;
export type Nullable<T> = T | null;

export interface Todo {
  id?: string;
  title: string;
  description?: string;
  completed: boolean;
}
