import React from 'react';

function UserListItem() {
  return (
    <header>
        <div className="content">
            <img src="images/img5.jpg"alt=" " />
            <div className="details">
                <span>Sanya</span>
                <p>This is test message</p>
            </div>
        </div>
        <div className="stastus-dot"><i className="fas fa-circle"></i></div>
    </header>
  );
}

export default UserListItem;
