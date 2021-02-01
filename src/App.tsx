import React from 'react';
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider, Frame } from '@shopify/polaris';
import { Todos } from './Todos';

export default function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <Frame>
        <Todos />
      </Frame>
    </AppProvider>
  );
}
