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

export interface UsersParams {
  setIsFriendShown: Function;
  setFriendInChat: Function;
};

export interface ChatParams {
  isFriendShown: boolean;
  currentFriendInChat: IFriendListItem;
};
