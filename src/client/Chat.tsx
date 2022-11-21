import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IChatParams, IMessage } from './types';
import FriendInChat from './FriendInChat';
import Message from './Message';
import CurrentUser from './CurrentUser';
import { fetchMessages, saveMessage, removeMessage } from './utils/chatUtils';
import Logger from './Logger';
import SendMessageButton from "./SentMessageButton"
import EditMessageButton from "./EditMessageButton";
import DeleteMessageDialog from "./DeleteMessageDialog";

function Chat(data: IChatParams) {
  const emptyMessages: IMessage[] = [];
  const [messages, setMessages] = useState(emptyMessages);
  const [currentMessage, setCurrentMessage] = useState({ message: '', id: '', isEditing: false });
  const [deletedMessage, setDeletedMessage] = useState({id: ''});

  // Fetch a list of previously sent messages when a pages is loaded
  useEffect(() => {
    const renderMessages = async () => {
      if(! data.isFriendShown) return;

      try {
        const messages: IMessage[] = await fetchMessages(CurrentUser.get(), data.friendInChat);
        setMessages(messages);
      }
      catch(ex: any) {
        // console.log('Failed to fetch Messages', ex);
      }
    };

    renderMessages();
  }, [data]); // Pass data as arg to make sure the fetch is done only when a Friend is selected

  const sendMessage = async () => {
    if(currentMessage.message.length === 0) return;

    const message: IMessage = await saveMessage(currentMessage, CurrentUser.get().id, data.friendInChat.id);
    data.chatClient.handleSendButton(message.message, message.id);

    const list = [...messages, message];
    setMessages(list);
    setCurrentMessage({ message: '', id: '', isEditing: false });
  };

  const updateMessage = async () => {
    if(currentMessage.message.length === 0) return;

    data.chatClient.handleUpdateButton(currentMessage.message, currentMessage.id);
    const message: IMessage = await saveMessage(currentMessage, CurrentUser.get().id, data.friendInChat.id);
    const list = replaceMessageInList(message, messages);
    setMessages(list);
    setCurrentMessage({ message: '', id: '', isEditing: false });
  };

  const replaceMessageInList = (message: IMessage, messageList: IMessage[]) => {
    const list = messageList.map(m => {
      if (m.id === message.id) {
        return {...m, ...message};
      }
      return m;
    });

    return list;
  };

  const deleteMessageFromList = (message: IMessage, messageList: IMessage[]) => {
    return messageList.filter((m) => m.id !== message.id)
  }

  const deleteMessage = async () => {
    if(deletedMessage.id.length === 0) return;
    const message: IMessage = await removeMessage(deletedMessage, CurrentUser.get().id, data.friendInChat.id);
    data.chatClient.handleDeleteButton(deletedMessage.id);
    const list = deleteMessageFromList(message, messages);
    setMessages(list);
    setDeletedMessage({ id: '' });
  };

  const closeDeleteDialog = () => {setDeletedMessage({id: ''})}

  if (data.isFriendShown) {
    // This is called when a message is received
    data.chatClient.connection.onmessage = (evt: any) => {
      var text = "";
      var msg = JSON.parse(evt.data);
      Logger.log("Message received: ");

      console.dir(msg);
      var time = new Date(msg.date);
      var timeStr = time.toLocaleTimeString();

      switch(msg.type) {
        case "clientId":
          data.chatClient.clientId = msg.clientId;
          let name = CurrentUser.get().nickname;
          data.chatClient.setUsername(name);
          data.chatClient.targetUsername = data.friendInChat.nickname;
          break;

        case "username":
          text = "<b>User <em>" + msg.name + "</em> signed in at " + timeStr + "</b><br>";
          break;

        case "message":
          text = "(" + timeStr + ") <b>" + msg.name + "</b>: " + msg.text + "<br>";
          const m = {
            id: msg.id,
            userId: data.friendInChat.id,
            recipeintId: CurrentUser.get().id,
            message: msg.text,
            isTo: true,
            isFrom: false,
            isEditing: msg.isEditing,
            isDeleted: msg.isDeleted,
            fromAvatar: data.friendInChat.avatar,
            status: msg.status,
            setCurrentMessage: () => {},
            setDeletedMessage: () => {}
          };

          let list: IMessage[] = [];
          // A message was edited
          if (m.isEditing) list = replaceMessageInList(m, messages);
          // Or a message was deleted
          else if (m.isDeleted) list = deleteMessageFromList(m, messages);
          // Or a message was added
          else list = [...messages, m];

          setMessages(list);
          break;

        case "rejectusername":
          break;

        // Signaling messages: these messages are used to trade WebRTC
        // signaling information during negotiations leading up to a video
        // call.
        case "video-offer":  // Invitation and offer to chat
          data.chatClient.handleVideoOfferMsg(msg);
          break;

        case "video-answer":  // Callee has answered our offer
          data.chatClient.handleVideoAnswerMsg(msg);
          break;

        case "new-ice-candidate": // A new ICE candidate has been received
          data.chatClient.handleNewICECandidateMsg(msg);
          break;

        case "hang-up": // The other peer has hung up the call
          data.chatClient.handleHangUpMsg(msg);
          break;

        // Unknown message; output to console for debugging.
        default:
          Logger.logError("Unknown message received:");
          Logger.logError(msg);
      }
    };
  }

  return (
    <div className="wrapper">
      {deletedMessage.id.length !== 0 ?
        <DeleteMessageDialog
          onSubmit = { (e: any) => { e.preventDefault(); deleteMessage() }}
          onCancel = { (e: any) => {e.preventDefault(); closeDeleteDialog()} } />
      : ''
      }

      <div>
        <a href="/profile" className="right logout">Profile</a>
      </div>
      <section className="chat-area">
        { data.isFriendShown ? <FriendInChat {...data.friendInChat} />  : <header></header> }

        {/* Render a list of Messages */}
        <div className="chat-box">
          {messages.map((message: IMessage) => {
            message.isEditing = false;
            message.setCurrentMessage = setCurrentMessage;
            message.setDeletedMessage = setDeletedMessage;
            return <Message key={message.id} {...message} />
          })}
        </div>

        {
          data.isFriendShown ?
          <form action="#" className="typing-area" data-testid="message-form">
            <input
              value={currentMessage.message}
              onChange={ (evt) => { setCurrentMessage({ message: evt.target.value, id: currentMessage.id, isEditing: currentMessage.isEditing }) }}
              type="text"
              placeholder="Type a message"
            />
            { currentMessage.isEditing ?
              <EditMessageButton onClick = { (e: any) => { e.preventDefault(); updateMessage(); }} />
              :
              <SendMessageButton onClick = { (e: any) => { e.preventDefault(); sendMessage(); }} />
            }
            <button onClick={ (e) => { e.preventDefault(); data.chatClient.invite(e) }}>
              <i className='fas fa-video'></i>
            </button>
          </form>

           //<button onClick={ (e) => { e.preventDefault(); data.chatClient.invite(e) }}>
         // <i className='fa fa-phone'></i>
        //</button>
          :
          <div className='typing-area'></div>
        }
      </section>

    </div>
  );
}
export default Chat;
