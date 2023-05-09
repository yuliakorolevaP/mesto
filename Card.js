import handleCardClick from "./index.js";
export default class Card{
  constructor(name, link, templateSelector) {
    this._templateSelector = templateSelector;
    this._name = name;
    this._link = link;
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
    this._setEventListeners();
    // Добавим данные
    this._title.textContent=this._name;
    this._elementImage.alt=this._name;
    this._elementImage.src=this._link;
    // Вернём элемент наружу
    return this._element;
  } 
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick();
    });
    this._elementImage.addEventListener('click', () => {
      handleCardClick(this._name, this._link);
      // this._handleCardClick();
    });
  }
  _handleLikeClick() {
    this._likeButton.classList.toggle('element__button_active')
  }
  _handleDeleteClick() {
    this._element.remove();
  }
}