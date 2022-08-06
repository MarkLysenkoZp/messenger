import React, { useState } from 'react';
import Users from './Users';
import Chat from './Chat';
import { UsersParams, ChatParams, IFriendListItem } from './types';
import { emptyUser } from './constants';

function App() {
  const [isFriendShown, setIsFriendShown] = useState(false);
  const [currentFriendInChat, setFriendInChat] = useState(emptyUser);

  const usersParams: UsersParams = {
    setIsFriendShown,
    setFriendInChat
  };

  const chatParams: ChatParams = {
    isFriendShown,
    currentFriendInChat
  }

  return (
    <React.StrictMode>
         <div className='wrapper'>
            <Users {...usersParams} />
        </div>
        <div className='wrapper'>
            <Chat {...chatParams} />
        </div>
    </React.StrictMode>
  );
}

export default App;
