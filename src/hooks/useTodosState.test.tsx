import React from 'react';
import { mount } from '@shopify/react-testing';
import { useTodosState } from './useTodosState';
import { createTodo } from '../factory';
import { Todo } from '../types';

const InnerComponent = (props: any) => <></>;

interface Props {
  initialState?: Todo[];
}
const TestComponent = ({ initialState }: Props) => {
  const hookValues = useTodosState(initialState || []);

  return <InnerComponent {...hookValues} />;
};

describe('useTodosState', () => {
  describe('newTodo', () => {
    it('create new Todo item in state', () => {
      const wrapper = mount(<TestComponent />);

      wrapper?.act(async () => {
        const innner = wrapper.find(InnerComponent);
        await innner?.props.newTodo(createTodo({ title: 'Sample Todo' }));
      });

      const inner = wrapper.find(InnerComponent);
      expect(inner?.props.todos).toHaveLength(1);
    });
  });

  describe('updateTodo', () => {
    it('updates existing todo with new values', () => {
      const initialState = [
        createTodo({ id: '1', title: 'Todo 1' }),
        createTodo({ id: '2', title: 'Todo 2' }),
      ];

      const wrapper = mount(<TestComponent initialState={initialState} />);

      wrapper?.act(async () => {
        const inner = wrapper.find(InnerComponent);
        await inner?.props.updateTodo({ id: '2', title: 'Todo 2 updated' });
      });

      const inner = wrapper.find(InnerComponent);
      expect(inner?.props.todos[1].title).toBe('Todo 2 updated');
    });

    it('rejects promise if Todo item is not found in state', async () => {
      const wrapper = mount(<TestComponent />);
      const inner = wrapper.find(InnerComponent);

      await expect(inner?.props.updateTodo(undefined)).rejects.toEqual({
        error: 'No Todo to update was found',
        success: false,
      });
    });
  });

  describe('deleteTodo', () => {
    it('removes a Todo item from state by it`s id', () => {
      const initialState = [
        createTodo({ id: '1', title: 'Todo 1' }),
        createTodo({ id: '2', title: 'Todo 2' }),
        createTodo({ id: '3', title: 'Todo 3' }),
      ];

      const wrapper = mount(<TestComponent initialState={initialState} />);

      wrapper?.act(async () => {
        const innner = wrapper.find(InnerComponent);
        await innner?.props.deleteTodo('2');
      });

      const inner = wrapper.find(InnerComponent);
      expect(inner?.props.todos).toHaveLength(2);
    });

    it('rejects the promise if id param is undefined', async () => {
      const wrapper = mount(<TestComponent />);
      const innner = wrapper.find(InnerComponent);

      await expect(innner?.props.deleteTodo(undefined)).rejects.toEqual({
        error: 'No ID provide',
        success: false,
      });
    });
  });
});
