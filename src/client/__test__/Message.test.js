/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Message from '../Message';

const testId = 'fromAvatar';

const data = {
  id: 1,
  userId: 1,
  recipeintId: 2,
  message: 'Test Message',
  isTo: true,
  isFrom: false,
  fromAvatar: 'src/img'
}

describe('Message', () => {
  test('Renders a message TO current user', () => {
    const { getByTestId } = render(<Message {...data} />);
    expect(getByTestId(testId)).toBeInTheDocument();
  });

  test('Renders a message FROM current user', () => {
    data.isTo = false;
    data.isFrom = true;
    const { queryByTestId } = render(<Message {...data} />);
    expect(queryByTestId(testId)).not.toBeInTheDocument();
  });
});