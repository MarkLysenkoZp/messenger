/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import { render } from '@testing-library/react';
 import '@testing-library/jest-dom';
 import UserSearch from '../UserSearch';
 
 describe('UserSearch', () => {
   test('Renders without errors', () => {
     expect(() => {
       render(<UserSearch/>);
     }).not.toThrow();
   });
 });