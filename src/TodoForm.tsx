import React, { useEffect, useState } from 'react';
import {
  Banner,
  Button,
  ButtonGroup,
  Checkbox,
  Form,
  FormLayout,
  TextField,
} from '@shopify/polaris';
import { Todo } from './types';
import { createTodo } from './factory';

interface Props {
  selectedTodo?: Todo;
  onSubmit: (todo: Todo) => void;
  onClear: () => void;
}

export const TodoForm = ({ onSubmit, onClear, selectedTodo }: Props) => {
  const [todo, setTodo] = useState<Todo>(createTodo());
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (selectedTodo) {
      setTodo({ ...selectedTodo });
    } else {
      setTodo(createTodo());
    }
  }, [selectedTodo]);

  const resetForm = () => {
    setTodo(createTodo());
    onClear();
    setShowError(false);
  };

  const validate = () => {
    return todo.title !== '';
  };

  const submitActionText = todo.id ? 'Update' : 'Create';
  const resetActionText = todo.id ? 'Cancel' : 'Reset';

  return (
    <Form
      onSubmit={() => {
        const valid = validate();

        if (!valid) {
          setShowError(true);
          return;
        }

        onSubmit(todo);
        onClear();
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
          multiline={5}
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
        <ButtonGroup>
          <Button submit primary>
            {submitActionText}
          </Button>
          <Button onClick={() => resetForm()}>{resetActionText}</Button>
        </ButtonGroup>
      </FormLayout>
    </Form>
  );
};
