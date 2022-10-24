import { IFriendListItem, IMessage} from './types';

export const emptyFriend: IFriendListItem = {
  id: 0,
  nickname: '',
  avatar: '',
  setIsFriendShown: ()=>{},
  setFriendInChat: ()=>{}
};

export const emptyMessage: IMessage = {
  id: 0,
  userId: 0,
  recipeintId: 0,
  message: '',
  isTo: false,
  isFrom: true,
  isEditing: false,
  fromAvatar: '',
  setCurrentMessage: ()=>{}
};

export const TERM_MIN_LENGHT = 3;

export const MEDIA_CONSTRAINTS = {
  audio: true,            // We want an audio track
  video: {
    aspectRatio: {
      ideal: 1.333333     // 3:2 aspect is preferred
    }
  }
};

export const HOST = 'chat-transport.herokuapp.com';