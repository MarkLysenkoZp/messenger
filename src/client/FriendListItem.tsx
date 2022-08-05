import React from 'react';
import { ListItemType } from './types';

function FriendListItem(data: ListItemType) {
  return (
    <header>
        <div className="content">
            <img src={data.avatar} alt="avatar" />
            <div className="details">
                <span>{data.nickname}</span>
                <p>This is test message</p>
            </div>
        </div>
        <div className="stastus-dot"><i className="fas fa-circle"></i></div>
        <a href="#" className="logout fab fa-telegram-plane"></a>
    </header>
  );
}

export default FriendListItem;
