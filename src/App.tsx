import React from "react";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider } from "@shopify/polaris";
import { ToDosList } from "./ToDosList";
import "./styles.css";

export default function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <ToDosList />
    </AppProvider>
  );
}
