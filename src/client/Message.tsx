import React from 'react';
import { IMessage } from './types';

function Message(data: IMessage) {
  const css = data.isTo ? 'chat incoming' : 'chat outgoing';

  return (
    <div className={css} key={data.id}>
      { data.isTo ? <img data-testid='fromAvatar' src={data.fromAvatar} alt="" /> : ''}
      <div className="details">
          <p>{data.message}</p>
      </div>
    </div>
  );
}

export default Message;