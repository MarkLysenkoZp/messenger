import axios from 'axios';
import { IMessage, IUserListItem, IFriendListItem, ICurrentMessage } from '../types';

export const fetchMessages = async (currentUser: IUserListItem, friend: IFriendListItem) => {
  const result: any = await axios.get('/api/fetch_messages',  { params: { friendId: friend.id } });
  const messages: IMessage[] = result.data.map((m: any) => {
    return {
      id: m.id,
      userId: m.userId,
      recipeintId: m.recipientId,
      message: m.message,
      isTo: m.recipientId == currentUser.id,
      isFrom: m.userId == currentUser.id,
      isEditing: m.isEditing,
      fromAvatar: m.recipientId == currentUser.id ? friend.avatar : '',
      setCurrentMessage: ()=>{}
    };
  });

  return messages;
};

export const saveMessage = async (messageObj: ICurrentMessage, userId: number, friendId: number) => {
  const result: any = await axios.post('/api/save_message', {
    recipientId: friendId,
    messageObj: messageObj
  });

  return {
    id: messageObj.isEditing ? messageObj.messageId : result.data.id,
    userId: userId,
    recipeintId: friendId,
    message: messageObj.isEditing ? messageObj.message : result.data.message,
    isTo: false,
    isFrom: true,
    isEditing: messageObj.isEditing ? true : false,
    fromAvatar: '',
    setCurrentMessage: ()=>{}
  };
};