import './styles.css';

import React from 'react';
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider } from '@shopify/polaris';
import { Todos } from './Todos';

export default function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <Todos />
    </AppProvider>
  );
}
