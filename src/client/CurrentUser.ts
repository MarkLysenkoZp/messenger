import { IUserListItem } from './types';
// TODO: add try-catch block
class CurrentUser {
  static set(user: IUserListItem){
    sessionStorage.setItem('currentUserId', user.id.toString());
    sessionStorage.setItem('currentUserNickname', user.nickname);
    sessionStorage.setItem('currentUserAvatar', user.avatar);
  }

  static get()  {
    return {
      id: sessionStorage.getItem('currentUserId'),
      nickname: sessionStorage.getItem('currentUserNickname'),
      avatar: sessionStorage.getItem('currentUserAvatar')
    }
  }
}

export default CurrentUser;