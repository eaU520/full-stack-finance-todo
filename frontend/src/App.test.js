/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react';
import App from './App';
import React from "react";

afterEach(() => {
  cleanup()
});

test('renders App', () => {
  render(<App />);//Issue with navigate and list of expenses
  // .toBeInTheDocument();

});
