import { render, screen } from '@testing-library/react';
import App from './App';

import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
