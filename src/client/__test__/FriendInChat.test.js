/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import { render } from '@testing-library/react';
 import '@testing-library/jest-dom';
 import FriendInChat from '../FriendInChat';
  
 describe('FriendInChat', () => {
   test('renders a User', () => {
     const nickname = 'John Connor';
     const params = {
       id: 1, nickname, avatar: 'src/img'
     };
     
     const { getByText } = render(<FriendInChat {...params} />);
     expect(getByText(nickname)).toBeInTheDocument();
   });
 });