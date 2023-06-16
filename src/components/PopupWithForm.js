import Popup from "../components/Popup.js";
export default class PopupWithForm extends Popup {
  // Принимает в конструктор селектор popup и callback сабмита формы
  constructor(popupSelector, { callbackFormSubmit }) {
    super(popupSelector);
    this._callbackFormSubmit = callbackFormSubmit;
    this._popupFormItem = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._popupFormItem.querySelectorAll('.popup__input'));
    this._sendButton = this._popup.querySelector('.popup__button');
    this._sendButtonText = this._sendButton.textContent;
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(inputItem => {
      formValues[inputItem.name] = inputItem.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupFormItem.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackFormSubmit(this._getInputValues());
      evt.target.reset(); 
    });
  }
  
  close() {
    super.close();
    this._popupFormItem.reset();
  }

  putSavingProcessText() {
    this._sendButton.textContent = 'Сохранение...';
  }
 
  returnSavingProcessText() {
    this._sendButton.textContent = this._sendButtonText;
  }
}