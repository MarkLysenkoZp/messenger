/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Chat from '../Chat';
 
describe('Chat', () => {
  test('Renders without errors', () => {
    const chatParams = {
      isFriendShown: true,
      friendInChat: {}
    };

    expect(() => {
      render(<Chat {...chatParams} />);
    }).not.toThrow();
  });

  test('renders with User', () => {
    const nickname = 'John Connor';
    const testId = 'message-form';
    const chatParams = {
      isFriendShown: true,
      friendInChat: { id: 1, nickname, avatar: 'src/img' }
    };
    
    const { getByText, getByTestId } = render(<Chat {...chatParams} />);
    expect(getByText(nickname)).toBeInTheDocument();
    expect(getByTestId(testId)).toBeInTheDocument();
  });

  test('renders without User', () => {
    const nickname = 'John Connor';
    const testId = 'message-form';
    const chatParams = {
      isFriendShown: false,
      friendInChat: { id: 1, nickname, avatar: 'src/img' }
    };
    
    const { queryByText, queryByTestId } = render(<Chat {...chatParams} />);
    expect(queryByText(nickname)).not.toBeInTheDocument();
    expect(queryByTestId(testId)).not.toBeInTheDocument();
  });

});