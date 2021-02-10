import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useTodosState } from './useTodosState';
import { createTodo } from '../factory';
import { Todo } from '../types';

describe('useTodosState', () => {
  describe('newTodo', () => {
    it('create new Todo item in state', () => {
      const { result } = renderHook(useTodosState);
      act(() => {
        result.current.newTodo(createTodo({ title: 'Sample Todo' }));
      });

      expect(result.current.todos).toHaveLength(1);
    });
  });

  describe('updateTodo', () => {
    it('updates existing todo with new values', () => {
      const initialState = [
        createTodo({ id: '1', title: 'Todo 1' }),
        createTodo({ id: '2', title: 'Todo 2' }),
      ];

      const { result } = renderHook(useTodosState, {
        initialProps: initialState,
      });

      act(() => {
        result.current.updateTodo({
          id: '2',
          title: 'Todo 2 Updated',
          completed: false,
        });
      });

      expect(result.current.todos[1].title).toBe('Todo 2 Updated');
    });

    it('rejects promise if Todo item is not found in state', async () => {
      const { result } = renderHook(useTodosState);
      await expect(result.current.updateTodo(createTodo())).rejects.toEqual({
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

      const { result } = renderHook(useTodosState, {
        initialProps: initialState,
      });

      act(() => {
        result.current.deleteTodo('2');
      });

      expect(result.current.todos).toHaveLength(2);
    });

    it('rejects the promise if id param is undefined', async () => {
      const { result } = renderHook(useTodosState);
      await expect(result.current.deleteTodo(undefined)).rejects.toEqual({
        error: 'No ID provide',
        success: false,
      });
    });
  });
});
