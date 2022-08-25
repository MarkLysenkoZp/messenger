import React from 'react';
import { IMessage } from './types';

function Message(data: IMessage) {
  const css = data.isTo ? 'chat incoming' : 'chat outgoing';

  const onClick = (event: any) => {
    event.preventDefault();
    data.setCurrentMessage({ message: data.message, messageId: data.id, isEditing: true })
  }

  return (
    <div className={css} key={data.id}>
      { data.isTo ? <img data-testid='fromAvatar' src={data.fromAvatar} alt="" /> : ''}
      <div className="details">
        <p>{data.message}</p>
        { data.isFrom ? <a href="#" onClick={onClick} className="edit-message fa fa-edit"></a> : ''}
      </div>
    </div>
  );
}

export default Message;