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
}

const intialTodoState = createTodo();

export const TodoForm = ({ onSubmit, selectedTodo }: Props) => {
  const [todo, setTodo] = useState<Todo>(intialTodoState);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (selectedTodo) {
      setTodo({ ...selectedTodo });
    } else {
      setTodo({ ...intialTodoState });
    }
  }, [selectedTodo]);

  const resetForm = () => {
    setTodo({ ...intialTodoState });
    setShowError(false);
  };

  const validate = () => {
    return todo.title !== '';
  };

  const submitActionText = todo.id ? 'Update' : 'Create';
  const resetActionText = 'Cancel';

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
