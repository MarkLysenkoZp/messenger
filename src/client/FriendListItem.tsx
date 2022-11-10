import React from 'react';
import { IFriendListItem } from './types';
function FriendListItem(friend: IFriendListItem) {
  const onClick = () => {
    friend.setIsFriendShown(true);
    friend.setFriendInChat(friend);
  }

  return (
    <header>
        <div className="content">
            { friend.avatar ? <img src={friend.avatar} alt="avatar" /> : '' }
            <div className="details">
                <span>{friend.nickname}</span>
            </div>
        </div>
        <a href="#" onClick={onClick} className="logout fab fa-telegram-plane"></a>
    </header>
  );
}

export default FriendListItem;
