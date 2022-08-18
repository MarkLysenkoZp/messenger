import axios from 'axios';
import { IMessage, IUserListItem, IFriendListItem } from '../types';

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
      fromAvatar: m.recipientId == currentUser.id ? friend.avatar : ''
    };
  });

  return messages;
};

export const saveMessage = async (message: string, userId: number, friendId: number) => {
  const result: any = await axios.post('/api/save_message', {
    recipientId: friendId,
    message: message
  });

  return {
    id: result.id,
    userId: userId,
    recipeintId: friendId,
    message: message,
    isTo: false,
    isFrom: true,
    fromAvatar: ''
  };
};