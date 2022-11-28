import React from 'react';
import { IFriendListItem } from './types';
function FriendInChat(data: IFriendListItem){
  return (
    <header>
      {/*<a href="#" className="back-icon"><i className="fas fa-arrow-left"></i></a>  */}
      <img src={data.avatar} alt="" />
      <div className="details">
        <span>{data.nickname}</span>
        {/*<p>Online</p>*/}
      </div>
    </header>
  )
}

export default FriendInChat;