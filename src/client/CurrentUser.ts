import { IUserListItem } from './types';

class CurrentUser {
  static set(user: IUserListItem){
    sessionStorage.setItem('currentUserId', user.id.toString());
    sessionStorage.setItem('currentUserNickname', user.nickname);
    sessionStorage.setItem('currentUserAvatar', user.avatar);
  }

  static get()  {
    return {
      id: Number(sessionStorage.getItem('currentUserId')),
      nickname: String(sessionStorage.getItem('currentUserNickname')),
      avatar: String(sessionStorage.getItem('currentUserAvatar'))
    };
  }
}

export default CurrentUser;