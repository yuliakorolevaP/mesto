export default class UserInfo{
  constructor(username, usersubtitle){
    this._username = document.querySelector(username);
    this._usersubtitle = document.querySelector(usersubtitle);
  }
  // Метод возвращает объект с данными пользователя
  getUserInfo() {
    return {
      username: this._username.textContent,
      usersubtitle: this._usersubtitle.textContent
    };
  }
  // Метод принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(username, usersubtitle ) {
    this._username.textContent = username;
    this._usersubtitle.textContent = usersubtitle;
  }
}