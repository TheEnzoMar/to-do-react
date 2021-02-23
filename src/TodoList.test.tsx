import React from 'react';
import { ResourceItem, Button } from '@shopify/polaris';
import { mount } from './tests/mounts';
import { noop } from './utilities';
import { TodoList } from './TodoList';
import { createTodo } from './factory';

describe('<TodoList />', () => {
  it('renders without crashing', () => {
    const root = mount(
      <TodoList
        todos={[]}
        selectTodo={noop}
        toggleTodo={noop}
        onDeleteTodo={noop}
      />
    );

    expect(root.type).toBe(TodoList);
  });

  it('triggers the selectTodo onClick when a Todo item is clicked', () => {
    const initialState = [
      createTodo({
        id: '1',
        title: 'Todo 1',
        description: 'test',
        completed: false,
      }),
      createTodo({
        id: '2',
        title: 'Todo 2',
        description: 'test',
        completed: false,
      }),
    ];

    const selectedTodo = initialState[1];
    const onClickSpy = jest.fn();

    const root = mount(
      <TodoList
        todos={initialState}
        selectTodo={onClickSpy}
        toggleTodo={noop}
        onDeleteTodo={noop}
      />
    );

    root.find(ResourceItem, { id: '2' })?.trigger('onClick');
    expect(onClickSpy).toHaveBeenCalledWith(selectedTodo);
  });

  it('triggers the toggleTodo onClick when the Toggle button is clicked', () => {
    const initialState = [
      createTodo({
        id: '1',
        title: 'Todo 1',
        description: 'test',
        completed: false,
      }),
      createTodo({
        id: '2',
        title: 'Todo 2',
        description: 'test',
        completed: false,
      }),
    ];

    const toggleTodo = initialState[1];
    const onClickSpy = jest.fn();

    const root = mount(
      <TodoList
        todos={initialState}
        selectTodo={noop}
        toggleTodo={onClickSpy}
        onDeleteTodo={noop}
      />
    );

    const resourceItem = root.find(ResourceItem, { id: '2' });
    resourceItem?.find(Button, { children: 'Toggle' })?.trigger('onClick');
    expect(onClickSpy).toHaveBeenCalledWith(toggleTodo.id);
  });

  it('triggers the deleteTodo onClick when the Delete button is clicked', () => {
    const initialState = [
      createTodo({
        id: '1',
        title: 'Todo 1',
        description: 'test',
        completed: false,
      }),
      createTodo({
        id: '2',
        title: 'Todo 2',
        description: 'test',
        completed: false,
      }),
    ];

    const deleteTodo = initialState[1];
    const onClickSpy = jest.fn();

    const root = mount(
      <TodoList
        todos={initialState}
        selectTodo={noop}
        toggleTodo={noop}
        onDeleteTodo={onClickSpy}
      />
    );

    const resourceItem = root.find(ResourceItem, { id: '2' });
    resourceItem?.find(Button, { children: 'Delete' })?.trigger('onClick');
    expect(onClickSpy).toHaveBeenCalledWith(deleteTodo.id);
  });
});
