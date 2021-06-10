import { render, screen } from '@testing-library/react';
import AddNew from './AddNew';

test('renders learn react link', () => {
  render(<AddNew />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
