/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import { render } from '@testing-library/react';
 import '@testing-library/jest-dom';
 import UserInfo from '../UserInfo';
 
 describe('UserInfo', () => {
   test('Renders without errors', () => {
     expect(() => {
       render(<UserInfo/>);
     }).not.toThrow();
   });
 });