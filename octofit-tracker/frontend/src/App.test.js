import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock(
  'react-router-dom',
  () => ({
    NavLink: ({ children, className, to }) => {
      const resolvedClassName = typeof className === 'function' ? className({ isActive: false }) : className;
      return (
        <a className={resolvedClassName} href={to}>
          {children}
        </a>
      );
    },
    Routes: ({ children }) => children[0].props.element,
    Route: () => null,
  }),
  { virtual: true }
);

test('renders the OctoFit dashboard hero content', () => {
  render(<App />);
  expect(screen.getByText(/a cleaner bootstrap dashboard for fitness operations/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /explore activity data/i })).toBeInTheDocument();
});
