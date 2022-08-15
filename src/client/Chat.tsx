import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IChatParams, IMessage } from './types';
import FriendInChat from './FriendInChat';
import Message from './Message';
import CurrentUser from './CurrentUser';

function Chat(data: IChatParams) {
  const emptyMessages: IMessage[] = [];
  const [messages, setMessages] = useState(emptyMessages);
  const [currentMessage, setCurrentMessage] = useState('');
  useEffect(() => {
    const fetchMessages = async () => {
      if(! data.isFriendShown) return;
      
      try {
        const result: any = await axios.get('/api/fetch_messages',  { params: { friendId: data.friendInChat.id } });
        const _messages: IMessage[] = result.data.map((m: any) => {
          return {
            id: m.id,
            userId: m.userId,
            recipeintId: m.recipientId,
            message: m.message,
            isTo: m.recipientId == CurrentUser.get().id,
            isFrom: m.userId == CurrentUser.get().id,
            fromAvatar: m.recipientId == CurrentUser.get().id ? data.friendInChat.avatar : ''
          };
        });
        setMessages(_messages);
      }
      catch(ex: any) {
        // console.log('Failed to fetch Messages', ex);
      }
    };
    
    fetchMessages();
  }, [data]); // Pass data as arg to make sure the fetch is Done only when a Friend is selected

  const sendMessage = async () => {
    if(currentMessage.length === 0) return;
    // TODO: add try-catch block
    const result: any = await axios.post('/api/save_message', {
      recipientId: data.friendInChat.id,
      message: currentMessage
    });

    const message: any = {
      id: result.id,
      userId: CurrentUser.get().id,
      recipeintId: data.friendInChat.id,
      message: currentMessage,
      isTo: false,
      isFrom: true,
      fromAvatar: ''
    };
    const list = [...messages, message];
    setMessages(list);
    setCurrentMessage('');
  }

  return (
    <div className="wrapper">
        <div>
            <a href="/profile" className="right logout">Profile</a>
        </div>
        <section className="chat-area">
            { data.isFriendShown ? <FriendInChat {...data.friendInChat} />  : <header></header> }

            <div className="chat-box">
                {messages.map((message: IMessage) => {
                    return <Message key={message.id} {...message} />
                })}
            </div>
            { 
                data.isFriendShown ?
                <form action="#" className="typing-area" data-testid="message-form">
                    <input value={currentMessage} onChange={ (evt) => { setCurrentMessage(evt.target.value) } }  type="text" placeholder="Type a message" />
                    <button onClick={(e) => { e.preventDefault(); sendMessage(); }}>
                        <i className="fab fa-telegram-plane"></i>
                    </button>
                    <button><i className='fa fa-phone'></i></button>
                    <button><i className='fas fa-video'></i></button>
                </form>
                :
                <div className='typing-area'></div>
            }
        </section>
    </div>
    
  );
}

export default Chat;
