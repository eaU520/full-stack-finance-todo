/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react';
import App from './App';
import React from "react";
import userEvent from '@testing-library/user-event';

afterEach(() => {
  cleanup()
});

test('renders App', () => {
  


});
