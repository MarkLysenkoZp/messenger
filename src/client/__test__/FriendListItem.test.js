/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import FriendListItem from '../FriendListItem';
 
describe('FriendListItem', () => {
  test('Renders without errors', () => {
    const nickname = 'John';
    const { getByText } = render(<FriendListItem {...{ id: 1, nickname, avatar: '/src/img' }} />);
    expect(getByText(nickname)).toBeInTheDocument();
  });
});