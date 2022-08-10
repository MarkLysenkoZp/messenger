import React from 'react';
import { ChatParams } from './types';
import FriendInChat from './FriendInChat';

function Chat(data: ChatParams) {
  return (
    <div className="wrapper">
        <div>
            <a href="/profile" className="right logout">Profile</a>
        </div>
        <section className="chat-area">

            { data.isFriendShown ? <FriendInChat {...data.currentFriendInChat} />  : <header></header> }

            <div className="chat-box">
                <div className="chat outgoing">
                    <div className="details">
                        <p>Hey, how are you, man?</p>
                    </div>
                </div>
                <div className="chat incoming">
                    <img src="images/img1.jpeg" alt="" />
                    <div className="details">
                        <p>Hi, I'm okay, dude</p>
                    </div>
                </div>
            </div>
            
                
                <form action="#" className='typing-area'>
                <input type="text" placeholder="Type  a message" />
                <button><i className='fab fa-telegram-plane'></i></button>
                <button><i className='fa fa-phone'></i></button>
                <button><i className='fas fa-video'></i></button>
                 </form>
                <div className='typing-area'></div>
            
        </section>
    </div>
    
  );
}

export default Chat;
