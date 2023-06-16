export default class Card{
  constructor(data, templateSelector, userId, item, handleCardClick) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick=handleCardClick.handleCardClick;
    this._userId=userId;
    this._putLike = handleCardClick.handleCardLike;
    this._removeLike = handleCardClick.handleCardDeleteLike;
    this._handleCardDelete=handleCardClick.handleCardDelete;
    this._cardId = item.cardId;
    this._authorId = item.authorId;
    this._card=data;
    
  }
  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element__item')
    .cloneNode(true);
    return cardElement;
  }
  generateCard(){
    this._element = this._getTemplate();
    this._likeButton=this._element.querySelector('.element__button');
    this._deleteButton=this._element.querySelector('.element__button-delete');
    this._elementImage=this._element.querySelector('.element__image');
    this._title=this._element.querySelector('.element__title');
    this.likeSelector = this._element.querySelector('.element__like-counter');
    this._setEventListeners();
    this._title.textContent=this._name;
    this._elementImage.alt=this._name;
    this._elementImage.src=this._link;
    this._hasDeleteBtn();
    this.renderCardLike(this._card);
    return this._element;
  } 
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._interactLike();});
    this._deleteButton.addEventListener('click', () => {
      this._handleCardDelete(this, this._cardId);});
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);});
  }

  _hasDeleteBtn() {
    if (this._userId !== this._authorId) {
      this._deleteButton.remove();
    }
  }
  handleDeleteClick() {
    this._element.remove();
  }

  renderCardLike(card) {
    this._likeArea = card.likes;
    if (this._likeArea.length === 0) {
      this.likeSelector.textContent = '';
    } else {
      this.likeSelector.textContent = this._likeArea.length;
    }
    if (this._likedCard()) {
      this._likeButton.classList.add('element__button_active');
    } else {
      this._likeButton.classList.remove('element__button_active');
    }
  }

  _likedCard() {
    return this._likeArea.find((userLike) => userLike._id === this._userId);
  }

  _interactLike() {
    if (this._likedCard()) {
      this._removeLike(this._cardId);
    } else {
      this._putLike(this._cardId);
    }
  }
}