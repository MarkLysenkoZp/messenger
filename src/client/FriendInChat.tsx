import React from 'react';
import { IFriendListItem } from './types';
function FriendInChat(data: IFriendListItem){
  return (
    <header>
      <img src={data.avatar} alt="" />
      <div className="details">
        <span>{data.nickname}</span>
      </div>
    </header>
  )
}

export default FriendInChat;