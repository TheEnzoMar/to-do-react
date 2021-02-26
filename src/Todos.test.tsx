import React from 'react';
import { ResourceItem, Button } from '@shopify/polaris';
import { mount } from './tests/mounts';
import { Todos } from './Todos';
import { TodoList } from './TodoList';
import { DeleteTodoModal } from './DeleteTodoModal';
import { createTodo } from './factory';
import { TodoForm } from './TodoForm';
import { Todo } from './types';

describe('<Todo />', () => {
  let initialTodos: Todo[] = [];

  beforeEach(() => {
    initialTodos = [
      createTodo({
        id: '1',
        title: 'Think',
        description: 'Think about the problem...',
        completed: false,
      }),
      createTodo({
        id: '2',
        title: 'Explore',
        description: 'Explore options...',
        completed: false,
      }),
      createTodo({
        id: '3',
        title: 'Build',
        description: 'Build it...',
        completed: false,
      }),
    ];
  });

  it('renders without crashing', () => {
    const root = mount(<Todos initialTodos={[]} />);

    expect(root.type).toBe(Todos);
  });

  it('updates selectedTodo when TodoList Item is clicked', () => {
    const root = mount(<Todos initialTodos={initialTodos} />);

    expect(root.find(TodoForm)).toHaveReactProps({
      selectedTodo: undefined,
    });

    const todoList = root.find(TodoList);
    todoList?.find(ResourceItem)?.trigger('onClick');

    expect(root.find(TodoForm)).not.toHaveReactProps({
      selectedTodo: undefined,
    });
  });

  it('renders the <DeleteTodoModal> when Delete button is clicked', () => {
    const root = mount(<Todos initialTodos={initialTodos} />);

    expect(root.find(DeleteTodoModal)).toHaveReactProps({ open: false });

    const todoList = root.find(TodoList);
    todoList?.find(Button, { children: 'Delete' })?.trigger('onClick');

    expect(root.find(DeleteTodoModal)).toHaveReactProps({ open: true });
  });
});
