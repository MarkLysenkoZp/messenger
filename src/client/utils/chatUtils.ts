import axios from 'axios';
import { IMessage, IUserListItem, IFriendListItem, ICurrentMessage, IDeletedMessage } from '../types';

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
      isDeleted: m.isDeleted,
      fromAvatar: m.recipientId == currentUser.id ? friend.avatar : '',
      status: m.status,
      setCurrentMessage: () => {},
      setDeletedMessage: () => {}
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
    id: result.data.id,
    userId: userId,
    recipeintId: friendId,
    message: result.data.message,
    isTo: false,
    isFrom: true,
    isEditing: messageObj.isEditing,
    isDeleted: false,
    fromAvatar: '',
    status: result.data.status,
    setCurrentMessage: () => {},
    setDeletedMessage: () => {}
  };
};

export const removeMessage = async (messageObj: IDeletedMessage, userId: number, friendId: number) => {
  const endpointUrl = '/api/delete_message/' + messageObj.id;
  const result: any = await axios.delete(endpointUrl);

  return {
    id: Number(messageObj.id),
    userId: userId,
    recipeintId: friendId,
    message: '',
    isTo: false,
    isFrom: true,
    isEditing: false,
    isDeleted: true,
    fromAvatar: '',
    status: result.data.status,
    setCurrentMessage: () => {},
    setDeletedMessage: () => {}
  };
};
