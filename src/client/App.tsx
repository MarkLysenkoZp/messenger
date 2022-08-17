import React, { useState } from 'react';
import Users from './Users';
import Chat from './Chat';
import { IUsersParams, IChatParams, IFriendListItem } from './types';
import { emptyFriend } from './constants';
import ChatClient from './ChatClient';

function App() {
  const [isFriendShown, setIsFriendShown] = useState(false);
  const [friendInChat, setFriendInChat] = useState(emptyFriend);
  const usersParams: IUsersParams = {
    setIsFriendShown,
    setFriendInChat
  };

  const chatClient = new ChatClient('local-video', 'remote-video', 'hangup-button');
  const chatParams: IChatParams = {
    isFriendShown,
    friendInChat,
    chatClient
  }

  if(isFriendShown) {
    chatClient.connect();

    chatClient.connection.onerror = function(evt: any) {
      console.dir(evt);
    }
  }

  return (
    <React.StrictMode>
      <div className='wrapper'>
        <Users {...usersParams} />
      </div>
      <div className='wrapper'>
        <Chat {...chatParams} />
      </div>
      <div className='wrapper camerabox'>
        <video id="remote-video" autoPlay></video>
        <video id="local-video" autoPlay muted></video>
        <button id="hangup-button" onClick={() => { chatClient.hangUpCall() }} role="button" disabled>
          Hang Up
        </button>
      </div>
    </React.StrictMode>
  );
}

export default App;
