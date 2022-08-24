export interface IUserListItem {
  id: number;
  nickname: string;
  avatar: string;
};

export interface IFriendListItem extends IUserListItem {
  setIsFriendShown: Function;
  setFriendInChat: Function;
};

export interface ISearchListItem extends IUserListItem {}

export interface IUsersParams {
  setIsFriendShown: Function;
  setFriendInChat: Function;
};

export interface IChatParams {
  isFriendShown: boolean;
  friendInChat: IFriendListItem;
  chatClient: any;
};

export interface IMessage {
  id: number;
  userId: number;
  recipeintId: number;
  message: string;
  isTo: boolean;
  isFrom: boolean;
  isEditing: boolean;
  fromAvatar: string;
  setCurrentMessage: Function;
}

export interface ICurrentMessage {
  messageId: string;
  message: string;
  isEditing: boolean;
}
