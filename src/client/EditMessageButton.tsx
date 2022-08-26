import React from "react";

function EditMessageButton(props: any) {
  return (
    <button onClick={props.onClick}>
      <i className="fa fa-check"></i>
    </button>
  )
}

export default EditMessageButton;
