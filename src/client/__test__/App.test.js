/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('App', () => {
  test('Renders without errors', () => {
    expect(() => {
      render(<App/>);
    }).not.toThrow();
  });
});