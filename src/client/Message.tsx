import React from 'react';
import { IMessage } from './types';

function Message(data: IMessage) {
  const css = data.isTo ? 'chat incoming' : 'chat outgoing';

  const editMessage = (event: any) => {
    event.preventDefault();
    data.setCurrentMessage({ message: data.message, id: data.id, isEditing: true })
  }

  const deleteMessage = (event: any) => {
    event.preventDefault();
    data.setDeletedMessage({ id: data.id })
  }

  return (
    <div className={css} key={data.id}>
      { data.isTo ? <img data-testid='fromAvatar' src={data.fromAvatar} alt="" /> : ''}
      <div className="details">
        {data.status === 'edited' ? <span className="edited-status">edited</span> : ''}
        <p>{data.message}</p>
        { data.isFrom ?
          <div className="massage-actions">
            <a href="#" onClick={editMessage} className="edit-message fa fa-edit"></a>
            <a href="#" onClick={deleteMessage} className="delete-message fa fa-trash"></a>
          </div>
          : ''
        }
      </div>
    </div>
  );
}

export default Message;
