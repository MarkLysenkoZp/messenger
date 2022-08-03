import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserInfo() {
  const [nickname, setNickname] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      const { data } = await axios.get('/api/userinfo');
      setNickname(data.nickname);
      setAvatar(data.avatar);
    };

    fetchUserInfo();
  }, []);

  return (
    <header>
        <div className="content">
            <img src={avatar} alt="avatar"/>
            <div className="details">
                <span>{nickname}</span>
            </div>
        </div>
        <a href="/logout" className="logout">Logout</a>
    </header>
  );
}

export default UserInfo;
