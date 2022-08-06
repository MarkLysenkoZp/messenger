/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import { render } from '@testing-library/react';
 import '@testing-library/jest-dom';
 import SearchListItem from '../SearchListItem';
  
 describe('SearchListItem', () => {
   test('Renders without errors', () => {
     const nickname = 'John';
     const { getByText } = render(<SearchListItem {...{ id: 1, nickname, avatar: '/src/img' }} />);
     expect(getByText(nickname)).toBeInTheDocument();
   });
 });