import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App Link', () => {
  render(<App />);
  // const linkElement = screen.getAllByText("Login");
  // expect(linkElement).toBeInTheDocument();
});
