import React from 'react';
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider, Frame } from '@shopify/polaris';
import { Todos } from './Todos';
import { createTodo } from './factory';
import { TodosProvider } from './TodosProvider';

const initialTodos = [
  createTodo({
    id: new Date().getTime().toString(),
    title: 'Think',
    description: 'Think about the problem...',
    completed: false,
  }),
  createTodo({
    id: (new Date().getTime() + 2).toString(),
    title: 'Explore',
    description: 'Explore options...',
    completed: false,
  }),
  createTodo({
    id: (new Date().getTime() + 3).toString(),
    title: 'Build',
    description: 'Build it...',
    completed: false,
  }),
];

export default function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <Frame>
        <TodosProvider initialTodos={initialTodos}>
          <Todos />
        </TodosProvider>
      </Frame>
    </AppProvider>
  );
}
