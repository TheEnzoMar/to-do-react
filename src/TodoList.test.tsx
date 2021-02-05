import React from 'react';
import { mountWithPolaris } from './tests/mounts';
import { noop } from './utilities';
import { TodoList } from './TodoList';

describe('<TodoList />', () => {
  it('renders without crashing', () => {
    const wrapper = mountWithPolaris(
      <TodoList
        todos={[]}
        selectTodo={noop}
        toggleTodo={noop}
        onDeleteTodo={noop}
      />
    );

    expect(wrapper.type).toBe(TodoList);
  });
});
