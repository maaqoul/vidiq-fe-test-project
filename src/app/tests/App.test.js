import { render, screen } from '@testing-library/react';

import App from '../App';

test('renders learn react link', () => {
  render(<App />);
  // TODO: FIX ME!
  const linkElement = screen.getByText(/Loading.../i);
  expect(linkElement).toBeInTheDocument();
});
