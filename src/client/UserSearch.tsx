import React from 'react';

function UserSearch(props: any) {
  // TODO: refactor this using state
  const searchButtonHandler = () => {
    const searchBar: any = document.querySelector(".search input");
    const searchIcon: any = document.querySelector(".search button");

    searchBar.classList.toggle("show");
    searchIcon.classList.toggle("active");
    searchBar.focus();
    if(searchBar.classList.contains("active")){
      searchBar.value = "";
      searchBar.classList.remove("active");
    }
  }

  return (
    <div className="search" onClick={() => { searchButtonHandler() }}>
      <span className="text">Select an user to start chat</span>
      <input type="text" onChange={props.onSearch} placeholder="Enter name to search..." />
      <button ><i className="fas fa-search"></i></button>
    </div>
  );
}

export default UserSearch;
