import React, { useState } from 'react';
// TODO: add try-catch block

function UserSearch(props: any) {
  const [searchButtonActive, toggleSearchButtonState] = useState(false);
  const searchInput: any = document.getElementById('searchInput');

  const searchButtonClickHandler = () => {
    // TODO: fire onchange for searchInput to reset Search List
    (searchButtonActive) ? toggleSearchButtonState(false) : toggleSearchButtonState(true);
  }

  const searchButtonClass = searchButtonActive ? 'active' : '';
  const searchInputClass = searchButtonActive ? 'active show' : '';

  return (
    <div className="search">
      <span className="text">Search users to add new friends</span>
      <input id='searchInput' className={searchInputClass} type="text" onChange={props.onSearch} placeholder="Enter name to search..." />
      <button className={searchButtonClass} onClick={searchButtonClickHandler}>
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
}

export default UserSearch;
