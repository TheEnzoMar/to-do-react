import React, { useState } from 'react';
import {
  Banner,
  Button,
  Checkbox,
  Form,
  FormLayout,
  TextField,
} from '@shopify/polaris';
import { Todo } from './types';

interface Props {
  onSubmit: (todo: Todo) => void;
}

export const TodoForm = ({ onSubmit }: Props) => {
  const [todo, setTodo] = useState<Todo>({
    title: '',
  });
  const [showError, setShowError] = useState(false);

  const resetForm = () => {
    setTodo({ title: '' });
    setShowError(false);
  };

  const validate = () => {
    return todo.title !== '';
  };

  return (
    <Form
      onSubmit={() => {
        const valid = validate();

        if (!valid) {
          setShowError(true);
          return;
        }

        onSubmit(todo);
        resetForm();
      }}
    >
      <FormLayout>
        {showError && <Banner status="critical">Invalid Todo</Banner>}
        <TextField
          value={todo.title}
          onChange={(value) => {
            setTodo({
              ...todo,
              title: value,
            });
          }}
          label="Title"
        />
        <TextField
          value={todo.description}
          onChange={(value) => {
            setTodo({
              ...todo,
              description: value,
            });
          }}
          label="Description"
        />
        <Checkbox
          checked={todo.completed}
          label="Completed"
          onChange={(value) => {
            setTodo({
              ...todo,
              completed: value,
            });
          }}
        />
        <Button submit>Add</Button>
      </FormLayout>
    </Form>
  );
};
