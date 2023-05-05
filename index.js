import FormValidator from './FormValidator.js';
import Card from "./Card.js";
const configValidation={
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}; 

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 
const buttompensil = document.querySelector('.profile__button-pensil');
const formElement = document.querySelector('.popup__form');
const text = document.querySelector('.popup__input_type_text');
const type=document.querySelector('.popup__input_type_status');  
const title = document.querySelector('.profile__title'); 
const subtitle=document.querySelector('.profile__subtitle');
const buttomplus = document.querySelector('.profile__button-plus');
const popupAddImage = document.querySelector('.popup_image');
const popupUpdate = document.querySelector('.popup_edit');
const nameImage = document.querySelector('.popup__input_type_name');
const srcImage=document.querySelector('.popup__input_type_src');
const formElementAdd = document.querySelector('.popup__form_image');
const popupZoomImage=document.querySelector('.popup_zoom');
const elements=document.querySelector('.elements');
const titleZoom=document.querySelector('.popup__title-zoom');
const popupImage=document.querySelector('.popup__image');
const formValidator= new FormValidator(configValidation, formElement);
formValidator.enableValidation();
const formValidatorImage= new FormValidator(configValidation, formElementAdd);
formValidatorImage.enableValidation();
const deactivateButton=function (popup) {
  const buttonElement =popup.querySelector('.popup__button');
  buttonElement.classList.add('popup__button_disabled');
  buttonElement.setAttribute('disabled', 'disabled');
}

const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('mousedown', closeAll);
  document.addEventListener('keydown', closeByEscape);
}

const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('mousedown', closeAll);
  document.removeEventListener('keydown', closeByEscape);
}

const closeAll = (evt)=>{
  if (evt.target===evt.currentTarget){
    closePopup(evt.target);
  }
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')// нашли открытый попап
    closePopup(openedPopup);//закрыли попап с помощью функции 
  }
}

buttompensil.addEventListener('click', function(){
  openPopup(popupUpdate);
  deactivateButton(popupUpdate);
  text.value= title.textContent;
  type.value= subtitle.textContent;
});

// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__exit');

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

buttomplus.addEventListener('click', function(){
  openPopup(popupAddImage);
  deactivateButton(popupAddImage);
});

formElement.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const textvalue = text.value;
  const typevalue = type.value;
  title.textContent=textvalue;
  subtitle.textContent=typevalue;
  closePopup(popupUpdate);
});

initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item.name, item.link, '#element-template');
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  // Добавляем в DOM
  elements.append(cardElement);
}); 

formElementAdd.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const card = new Card(nameImage.value, srcImage.value, '#element-template');
  const newImage = card.generateCard();
  elements.prepend(newImage);
  closePopup(popupAddImage);
  evt.target.reset();
});  

export default function handleCardClick(name, link) {
  titleZoom.textContent=name;
  popupImage.alt=name;
  popupImage.src=link;
  openPopup(popupZoomImage);
}