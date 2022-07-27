/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import { render } from '@testing-library/react';
 import '@testing-library/jest-dom';
 import UserListItem from '../UserListItem';
 
 describe('UserListItem', () => {
   test('Renders without errors', () => {
     expect(() => {
       render(<UserListItem/>);
     }).not.toThrow();
   });
 });