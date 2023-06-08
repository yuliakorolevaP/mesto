import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  // Принимает в конструктор селектор popup
  constructor(popupSelector) {
    super(popupSelector);
    // this._popupItem находится в родительском классе
    this._popupDescription = this._popup.querySelector('.popup__title-zoom');
    this._popupImage = this._popup.querySelector('.popup__image');
  }
  // Метод перезаписывает родительский метод open
  open(description, image) {
    // Вставляем в popup картинку с src изображения и подписью к картинке
    this._popupDescription.textContent = description;
    this._popupImage.src = image;
    this._popupImage.alt = description;
    super.open();
  }
}