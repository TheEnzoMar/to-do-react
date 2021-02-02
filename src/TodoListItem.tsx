import React from 'react';
import {
  Button,
  ButtonGroup,
  Stack,
  TextContainer,
  TextStyle,
} from '@shopify/polaris';
import { Todo } from './types';

interface Props {
  todo: Todo;
  onCompleted: () => void;
  onDelete: () => void;
}

export const TodoListItem = ({ todo, onCompleted, onDelete }: Props) => {
  return (
    <Stack alignment="center">
      <Stack.Item fill>
        <h3>
          <TextStyle>{todo.title}</TextStyle>
        </h3>
        <TextContainer>{todo.description}</TextContainer>
      </Stack.Item>
      <Stack.Item>
        <ButtonGroup spacing="tight">
          <Button onClick={onDelete} size="slim">
            Delete
          </Button>
          <Button onClick={onCompleted} size="slim" primary>
            Done
          </Button>
        </ButtonGroup>
      </Stack.Item>
    </Stack>
  );
};
