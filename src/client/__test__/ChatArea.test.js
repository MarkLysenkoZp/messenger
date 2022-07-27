/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import { render } from '@testing-library/react';
 import '@testing-library/jest-dom';
 import ChatArea from '../ChatArea';
 
 describe('ChatArea', () => {
   test('Renders without errors', () => {
     expect(() => {
       render(<ChatArea/>);
     }).not.toThrow();
   });
 });