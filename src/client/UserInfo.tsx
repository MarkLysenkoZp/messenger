import React from 'react';
import { IUserListItem } from './types';
// TODO: add try-catch block

function UserInfo(user: IUserListItem) {
  return (
    <header>
        <div className="content">
            { user.avatar ? <img src={user.avatar} alt="avatar"/> : '' } 
            <div className="details">
                <span>{user.nickname}</span>
            </div>
        </div>
        <a href="/logout" className="logout">Logout</a>
    </header>
  );
}

export default UserInfo;
