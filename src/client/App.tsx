import React, { useState } from 'react';
import Users from './Users';
import Chat from './Chat';
import { IUsersParams, IChatParams, IFriendListItem } from './types';
import { emptyFriend } from './constants';
 
function App() {
  const [isFriendShown, setIsFriendShown] = useState(false);
  const [friendInChat, setFriendInChat] = useState(emptyFriend);

  const usersParams: IUsersParams = {
    setIsFriendShown,
    setFriendInChat
  };

  const chatParams: IChatParams = {
    isFriendShown,
    friendInChat
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
