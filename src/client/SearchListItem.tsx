import React, { useState } from 'react';
import { ISearchListItem } from './types';
import axios from 'axios';

function SearchListItem(user: ISearchListItem) {
  const [friendAdded, setFriendAdded] = useState(false);

  const addFriend = async (event: any) => {
    event.preventDefault();
    if (friendAdded) return;
    
    try {
      await axios.post('/api/add_friend', { userId: user.id });
    }
    catch(ex: any) {
      console.log('Failed to POST to /api/add_friend')
    }
    setFriendAdded(true);
  }

  return (
    <header>
        <div className='content'>
            <img src={user.avatar} alt="" />
            <div className='details'>
                <span>{user.nickname}</span> 
                <p>Online</p>
            </div>
        </div>
        <a href="#" onClick={addFriend} className="logout">
          { friendAdded ? 'Friend Added' : 'Add To Friends' }
        </a>
    </header>
  );
}

export default SearchListItem;
