import './pages/index.css'; // добавьте импорт главного файла стилей
import FormValidator from '../components/FormValidator.js';
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";

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
const text = document.querySelector('.popup__input_type_text');
const type=document.querySelector('.popup__input_type_status');  
const buttomplus = document.querySelector('.profile__button-plus');
const nameImage = document.querySelector('.popup__input_type_name');
const srcImage=document.querySelector('.popup__input_type_src');
const elements=document.querySelector('.elements');
const formElement = document.querySelector('.popup__form');
const formElementAdd = document.querySelector('.popup__form_image');
function createCard(item) {
  const card = new Card(item, '#element-template', {handleCardClick: (name, image) => { ImagePopup.open(name, image)} });
  const newImage = card.generateCard(item);
  return newImage;
  }

const popupEditeAvatar = new PopupWithForm('#popup-edit', {
  callbackFormSubmit: () =>{
    UserInfo1.setUserInfo(text.value, type.value);
    Popupedit.close();
  }
});
popupEditeAvatar.setEventListeners();

const popupAddCard = new PopupWithForm('#popup-image', {
  callbackFormSubmit: ()=> {
    elements.prepend(createCard({name: nameImage.value, link: srcImage.value}));
    PopupAddImage.close();
  }
});
popupAddCard.setEventListeners();

const ImagePopup = new PopupWithImage('#popup-zoom');
ImagePopup.setEventListeners();

const UserInfo1=new UserInfo('.profile__title', '.profile__subtitle');
const configValidation={
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}; 


const formValidator= new FormValidator(configValidation, formElement);
formValidator.enableValidation();

const formValidatorImage= new FormValidator(configValidation, formElementAdd);
formValidatorImage.enableValidation();

const Popupedit=new Popup('.popup_edit');
buttompensil.addEventListener('click', function(){
  Popupedit.open();
  formValidator.resetValidation();
  const actualUserInfo = UserInfo1.getUserInfo();
  text.value = actualUserInfo.username;
  type.value = actualUserInfo.usersubtitle;
});

const PopupAddImage=new Popup('.popup_image');
buttomplus.addEventListener('click', function(){
  PopupAddImage.open();
  formValidatorImage.resetValidation();
});

const Section1=new Section({initialCards, renderer: (initialCards) => {
  Section1.addItem(createCard(initialCards));
}}, '.elements');
Section1.renderItems(initialCards);