import React from 'react';
import { IFriendListItem } from './types';

function FriendListItem(data: IFriendListItem) {
  const onClick = () => {
    data.setIsFriendShown(true);
    data.setFriendInChat(data);
  }

  return (
    <header>
        <div className="content">
            { data.avatar ? <img src={data.avatar} alt="avatar" /> : '' }
            <div className="details">
                <span>{data.nickname}</span>
                <p>This is test message</p>
            </div>
        </div>
        <div className="stastus-dot"><i className="fas fa-circle"></i></div>
        <a href="#" onClick={onClick} className="logout fab fa-telegram-plane"></a>
    </header>
  );
}

export default FriendListItem;
