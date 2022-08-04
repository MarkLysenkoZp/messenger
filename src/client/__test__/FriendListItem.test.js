/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import { render } from '@testing-library/react';
 import '@testing-library/jest-dom';
 import FriendListItem from '../FriendListItem';
 
 describe('UserListItem', () => {
   test('Renders without errors', () => {
     expect(() => {
       render(<FriendListItem {...{nickname: 'John', avatar: '/src/img'}} />);
     }).not.toThrow();
   });
 });