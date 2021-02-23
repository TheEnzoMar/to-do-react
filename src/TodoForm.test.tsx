import React from 'react';
import { Form, Button, Checkbox, TextField, Banner } from '@shopify/polaris';
import { mount } from './tests/mounts';
import { TodoForm } from './TodoForm';
import { noop } from './utilities';
import { createTodo } from './factory';

describe('<TodoForm />', () => {
  it('trigger the onSubmit when Todo form data is valid', () => {
    const expectedTodo = createTodo({
      title: 'Sample Todo',
      description: 'This is a test...',
    });
    const onSubmitSpy = jest.fn();
    const root = mount(<TodoForm onSubmit={onSubmitSpy} />);

    root
      .find(TextField, { label: 'Title' })
      ?.trigger('onChange', expectedTodo.title);

    root
      .find(TextField, { label: 'Description' })
      ?.trigger('onChange', expectedTodo.description);

    root.find(Form)?.trigger('onSubmit');

    expect(onSubmitSpy).toHaveBeenCalledWith(expectedTodo);
  });

  it('does not trigger onSubmit when Todo form data is invalid', () => {
    const onSubmitSpy = jest.fn();
    const root = mount(<TodoForm onSubmit={onSubmitSpy} />);

    root.find(Form)?.trigger('onSubmit');

    expect(onSubmitSpy).not.toHaveBeenCalled();
    expect(root.find(Banner, { status: 'critical' })).not.toBeNull();
  });

  it('resets form when Cancel button is clicked', () => {
    const root = mount(<TodoForm onSubmit={noop} />);
    const cancelBtn = root.find(Button, { children: 'Cancel' });

    root
      .find(TextField, { label: 'Title' })
      ?.trigger('onChange', 'Sample Todo');
    root
      .find(TextField, { label: 'Description' })
      ?.trigger('onChange', 'This is a test...');
    root.find(Checkbox, { label: 'Completed' })?.trigger('onChange', true);

    expect(root.find(TextField, { label: 'Title' })).toHaveReactProps({
      value: 'Sample Todo',
    });
    expect(root.find(TextField, { label: 'Description' })).toHaveReactProps({
      value: 'This is a test...',
    });
    expect(root.find(Checkbox, { label: 'Completed' })).toHaveReactProps({
      checked: true,
    });

    cancelBtn?.trigger('onClick');

    expect(root.find(TextField, { label: 'Title' })).toHaveReactProps({
      value: '',
    });
    expect(root.find(TextField, { label: 'Description' })).toHaveReactProps({
      value: undefined,
    });
    expect(root.find(Checkbox, { label: 'Completed' })).toHaveReactProps({
      checked: false,
    });
  });

  it('sets internal todo state to default values if selectedTodo is undefined', () => {
    const root = mount(<TodoForm onSubmit={noop} />);

    expect(root.find(TextField, { label: 'Title' })).toHaveReactProps({
      value: '',
    });
    expect(root.find(TextField, { label: 'Description' })).toHaveReactProps({
      value: undefined,
    });
    expect(root.find(Checkbox, { label: 'Completed' })).toHaveReactProps({
      checked: false,
    });
  });

  it('sets internal todo state to selectedTodo if defined', () => {
    const existingTodo = createTodo({
      id: '1',
      title: 'Sample Todo',
      description: 'This is a test...',
      completed: true,
    });

    const root = mount(
      <TodoForm onSubmit={noop} selectedTodo={existingTodo} />
    );

    expect(root.find(TextField, { label: 'Title' })).toHaveReactProps({
      value: existingTodo.title,
    });
    expect(root.find(TextField, { label: 'Description' })).toHaveReactProps({
      value: existingTodo.description,
    });
    expect(root.find(Checkbox, { label: 'Completed' })).toHaveReactProps({
      checked: existingTodo.completed,
    });
  });

  it('displays the text "Create" when there is no todo id', () => {
    const root = mount(<TodoForm onSubmit={noop} />);
    const submitButton = root.find(Button, { submit: true });

    expect(submitButton).toHaveReactProps({
      children: 'Create',
    });
  });

  it('displays the text "Update" when there is a todo id', () => {
    const existingTodo = createTodo({
      id: '1',
      title: 'Sample Todo',
      description: 'This is a test...',
      completed: true,
    });

    const root = mount(
      <TodoForm onSubmit={noop} selectedTodo={existingTodo} />
    );
    const submitButton = root.find(Button, { submit: true });

    expect(submitButton).toHaveReactProps({
      children: 'Update',
    });
  });
});
