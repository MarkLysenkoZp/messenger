import React from 'react';
import { ListItemType } from './types';

function UserInfo(user: ListItemType) {
  return (
    <header>
        <div className="content">
            <img src={user.avatar} alt="avatar"/>
            <div className="details">
                <span>{user.nickname}</span>
            </div>
        </div>
        <a href="/logout" className="logout">Logout</a>
    </header>
  );
}

export default UserInfo;
