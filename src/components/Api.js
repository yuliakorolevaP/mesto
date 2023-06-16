export default class Api {
  constructor(data) {
    this._link = data.link;
    this._headers = data.headers;
  }
  
  _processingServerResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`код ошибки: ${res.status}`);
    }
  }
  
  getInitialCards() {
    return fetch(`${this._link}/cards`, {
      headers: this._headers
    })
    .then(res => this._processingServerResponse(res));
  }

  getUserData() {
    return fetch(`${this._link}/users/me`, {
      headers: this._headers
    })
    .then(res => this._processingServerResponse(res));
  }

  addNewCard(data) {
    return fetch(`${this._link}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ name: data.nameInput, link: data.linkInput})
    })
    .then(res => this._processingServerResponse(res));
  }
  
  deleteCard(cardId) {
    return fetch(`${this._link}/cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then(res => { return this._processingServerResponse(res); })
  }
  
  sendUserData(profileData) {
    return fetch(`${this._link}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({name: profileData.typeInput, about: profileData.statusInput})
    })
    .then(res => this._processingServerResponse(res));
  }
  
  sendAvatarData(avatarLink) {
    return fetch(`${this._link}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ avatar: avatarLink.srcInput })
    })
    .then(res => this._processingServerResponse(res));
  }

  putCardLike(cardId) {
    return fetch(`${this._link}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'PUT',
    })
    .then(res => this._processingServerResponse(res));
  }

  deleteCardLike(cardId) {
    return fetch(`${this._link}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'DELETE',
    })
    .then(res => this._processingServerResponse(res));
  }
}
