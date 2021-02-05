import { AppProvider } from '@shopify/polaris';
import { createMount } from '@shopify/react-testing';
import React from 'react';

export const mountWithPolaris = createMount({
  context: () => ({}),
  render(element) {
    return <AppProvider i18n={[]}>{element}</AppProvider>;
  },
});
