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
    this._setEventListeners();
    // Добавим данные
    this._element.querySelector('.element__title').textContent=this._name;
    this._element.querySelector('.element__image').alt=this._name;
    this._element.querySelector('.element__image').src=this._link;
    // Вернём элемент наружу
    return this._element;
  } 
  _setEventListeners() {
    this._element.querySelector('.element__button').addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._element.querySelector('.element__button-delete').addEventListener('click', () => {
      this._handleDeleteClick();
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      handleCardClick(this._name, this._link);
      // this._handleCardClick();
    });
  }
  _handleLikeClick() {
    this._element.querySelector('.element__button').classList.toggle('element__button_active')
  }
  _handleDeleteClick() {
    this._element.remove();
  }
}