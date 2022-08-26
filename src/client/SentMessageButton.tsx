import React from "react";

function SendMessageButton(props: any) {
  return (
    <button onClick={props.onClick}>
      <i className="fab fa-telegram-plane"></i>
    </button>
  )
}

export default SendMessageButton;
