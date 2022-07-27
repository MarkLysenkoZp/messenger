 import React from 'react';

function UserInfo() {
  return (
    <header>
        <div className="content">
            <img src="images/img6.jpg" alt=""/>
            <div className="details">
                <span>Mark</span>
            </div>
        </div>
        <a href="/logout" className="logout">Logout</a>
    </header>
  );
}

export default UserInfo;
