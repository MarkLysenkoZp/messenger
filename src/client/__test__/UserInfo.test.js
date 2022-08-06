/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserInfo from '../UserInfo';
 
describe('UserInfo', () => {
  test('Renders without errors', () => {
    const nickname = 'John';
    const params = { id: 1, nickname, avatar: 'src/img' };

    const { getByText } = render(<UserInfo {...params}/>);
    expect(getByText(nickname)).toBeInTheDocument();
  });
});