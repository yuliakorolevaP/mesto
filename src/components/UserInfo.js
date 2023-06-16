export default class UserInfo{
  constructor(username, usersubtitle, avatar){
    this._username = document.querySelector(username);
    this._usersubtitle = document.querySelector(usersubtitle);
    this._userAvatar=document.querySelector(avatar);
  }
  
  getUserInfo() {
    return {
      username: this._username.textContent,
      usersubtitle: this._usersubtitle.textContent
    };
  }
  
  setUserInfo(data) {
    this._username.textContent = data.name;
    this._usersubtitle.textContent = data.about;
  }

  setUserAvatar(avatarLink) {
    this._userAvatar.src = avatarLink.avatar;
  }
}