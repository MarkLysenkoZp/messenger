import React from 'react';
import UserInfo from './UserInfo';
import UserSearch from './UserSearch';
import UserListItem from './UserListItem';

function Users() {
  return (
    <section className="users">
      <UserInfo />
      <UserSearch />
      <section className="users-list">
        <UserListItem />
      </section>
    </section>
  );
}

export default Users;
