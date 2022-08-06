import React, { useState, useEffect } from 'react';
import UserInfo from './UserInfo';
import UserSearch from './UserSearch';
import FriendListItem from './FriendListItem';
import SearchListItem from './SearchListItem';
import { IFriendListItem, ISearchListItem, UsersParams } from './types';
import { emptyUser, TERM_MIN_LENGHT } from './constants';

import axios from 'axios';

function Users(data: UsersParams) {
  const [currentUser, setCurrentUser] = useState(emptyUser);
  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const { data } = await axios.get('/api/userinfo');
      setCurrentUser(data);
    };

    const fetchFriends = async () => {
      const { data } = await axios.get('/api/fetch_friends');
      setFriends(data);
    }

    fetchUserInfo();
    fetchFriends();
  }, []);

  const onSearch = async (event: any) => {
    const term = event.target.value;

    // reset Search list
    if(term.length === 0) {
      setUsers([]);
      const { data } = await axios.get('/api/fetch_friends');
      setFriends(data);
      return;
    }

    if(term.length < TERM_MIN_LENGHT) return;

    // when User performs a search:
    // 1. Fetch matching users
    // 2. Clean the list of Friends for now
    const { data } = await axios.get('/api/search_users', { params: { term: term } });
    setFriends([]);
    setUsers(data);
  }

  return (
    <section className="users">
      <UserInfo {...currentUser} />
      <UserSearch onSearch={onSearch} />
      
      {/* Friends List */}
      <section className="users-list">
        {friends.map((friend: IFriendListItem) => {
          friend.setIsFriendShown = data.setIsFriendShown;
          friend.setFriendInChat = data.setFriendInChat;
          return <FriendListItem {...friend} />
        })}
      </section>

      {/* Search List */}
      <section className="users">
        {users.map((user: ISearchListItem) => {
          return <SearchListItem {...user} />
        })}
      </section>
    </section>
  );
}

export default Users;
