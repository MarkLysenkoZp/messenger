import React from "react";

function DeleteMessageDialog(props: any) {

  return (
    <div className="delete-message-dialog">
      <b>Are You Sure?</b>
      <br/>
      <button onClick={props.onSubmit}>
        <i className="fa fa-check"></i>
      </button>
      <button onClick={props.onCancel}>
        <i className='fa fa-times'></i>
      </button>
    </div>
  )
}

export default DeleteMessageDialog;
