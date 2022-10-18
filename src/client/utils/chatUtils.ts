import axios from 'axios';
import {IMessage, IUserListItem, IFriendListItem, ICurrentMessage, IDeletingMessage} from '../types';

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
      isDeleting: m.isDeleting,
      fromAvatar: m.recipientId == currentUser.id ? friend.avatar : '',
      setCurrentMessage: ()=>{},
      setDeletingMessage: ()=>{}
    };
  });

  return messages;
};

export const saveMessage = async (messageObj: ICurrentMessage, userId: number, friendId: number) => {
  const endpointUrl = messageObj.isEditing ? '/api/update_message' : '/api/save_message'
  const result: any = await axios.post(endpointUrl, {
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
    isEditing: messageObj.isEditing,
    isDeleting: false,
    fromAvatar: '',
    setCurrentMessage: ()=>{},
    setDeletingMessage: ()=>{}
  };
};

export const removeMessage = async (messageObj: IDeletingMessage, userId: number, friendId: number) => {
  const endpointUrl = '/api/delete_message/' + messageObj.messageId;
  const result: any = await axios.delete(endpointUrl);

  return {
    id: Number(messageObj.messageId),
    userId: userId,
    recipeintId: friendId,
    message: '',
    isTo: false,
    isFrom: true,
    isEditing: false,
    isDeleting: false,
    fromAvatar: '',
    setCurrentMessage: ()=>{},
    setDeletingMessage: ()=>{}
  };
};
