import React from 'react';

function ChatArea() {
  return (
    <div className="wrapper">
        <div>
            <a href="/profile" className="right logout">Profile</a>
        </div>
        <section className="chat-area">
            <header>
                <a href="#" className="back-icon"><i className="fas fa-arrow-left"></i></a>
                <img src="images/img1.jpeg" alt="" />
                <div className="details">
                    <span>Vasya</span>
                    <p>Online</p>
                  </div>
            </header>
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
            <form action="#" className="typing-area">
                <input type="text" placeholder="Type  a message" />
                <button><i className="fab fa-telegram-plane"></i></button>
            </form>
        </section>
    </div>
    
  );
}

export default ChatArea;
