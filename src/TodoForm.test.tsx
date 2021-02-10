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
    const wrapper = mount(<TodoForm onSubmit={noop} />);
    const cancelBtn = wrapper.find(Button, { children: 'Cancel' });

    wrapper
      .find(TextField, { label: 'Title' })
      ?.trigger('onChange', 'Sample Todo');
    wrapper
      .find(TextField, { label: 'Description' })
      ?.trigger('onChange', 'This is a test...');
    wrapper.find(Checkbox, { label: 'Completed' })?.trigger('onChange', true);

    expect(wrapper.find(TextField, { label: 'Title' })).toHaveReactProps({
      value: 'Sample Todo',
    });
    expect(wrapper.find(TextField, { label: 'Description' })).toHaveReactProps({
      value: 'This is a test...',
    });
    expect(wrapper.find(Checkbox, { label: 'Completed' })).toHaveReactProps({
      checked: true,
    });

    cancelBtn?.trigger('onClick');

    expect(wrapper.find(TextField, { label: 'Title' })).toHaveReactProps({
      value: '',
    });
    expect(wrapper.find(TextField, { label: 'Description' })).toHaveReactProps({
      value: undefined,
    });
    expect(wrapper.find(Checkbox, { label: 'Completed' })).toHaveReactProps({
      checked: false,
    });
  });

  it('loads exisitng Todo data in form', () => {});
});
