import { IFriendListItem, IMessage} from './types';
// TODO: add try-catch block
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
  fromAvatar: ''
};

export const TERM_MIN_LENGHT = 3;