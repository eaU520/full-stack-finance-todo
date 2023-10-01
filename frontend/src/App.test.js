/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from '@testing-library/react';
import App from './App';
import ExpenseList from "./components/ShowExpenseList";

test('renders App', () => {
  render(<App/>);
  
});
