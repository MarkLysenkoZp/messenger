/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Users from '../Users';
 
describe('Users', () => {
  test('Renders without errors', () => {
    expect(() => { render(<Users/>) }).not.toThrow();
  });
});