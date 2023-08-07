import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Login Link', () => {
  <App />
  const linkElement = screen.getAllByText("Login");
  expect(linkElement).toBeInTheDocument();
});
