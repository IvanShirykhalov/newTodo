import React from 'react';
import { render } from '@testing-library/react';
import AppWithReducer from "./AppWithReducer";

test('renders learn react link', () => {
  const { getByText } = render(<AppWithReducer />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
