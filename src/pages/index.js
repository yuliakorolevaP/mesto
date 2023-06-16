import './index.css'; // добавьте импорт главного файла стилей
import FormValidator from '../components/FormValidator.js';
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";
import PopupNotice from "../components/PopupNotice.js";

const apiConnect = new Api( {link: 'https://mesto.nomoreparties.co/v1/cohort-68',
headers: {
  authorization: '0be0e668-3bd1-4300-b735-a9364623e732',
  'Content-Type': 'application/json'
}});

const userInfo=new UserInfo(
'.profile__title',
'.profile__subtitle',
 '.profile__image',
);

let userId;
const buttompensil = document.querySelector('.profile__button-pensil');
const buttomavatar = document.querySelector('.profile__avatar-btn');
const text = document.querySelector('.popup__input_type_text');
const type=document.querySelector('.popup__input_type_status');  
const buttomplus = document.querySelector('.profile__button-plus');
const formElement = document.querySelector('.popup__form');
const formElementAdd = document.querySelector('.popup__form_image');
const formElementAddAvatar = document.querySelector('.popup__form_avatar');

function createCard(item) {
  const card = new Card(item, '#element-template', userId, {cardId: item._id, authorId: item.owner._id},
  {
    handleCardClick: (name, image) => { popupImage.open(name, image)}, 
    handleCardLike: (cardId) => { apiConnect.putCardLike(cardId)
      .then((res) => {
        card.renderCardLike(res);
      })
      .catch((err) => { console.log(`При лайке карточки возникла ошибка, ${err}`) })
    },
    handleCardDelete: (cardElement, cardId) => { popupNoticeDelete.open(cardElement, cardId) },
    handleCardDeleteLike: (cardId) => { apiConnect.deleteCardLike(cardId)
      .then((res) => {
        card.renderCardLike(res);
      })
      .catch((err) => { console.log(`При дизлайке карточки возникла ошибка, ${err}`) })
    },
  });
  const newImage = card.generateCard(item);
  return newImage;
}
  
const section=new Section({renderer: (initialCards) => {section.addItem(createCard(initialCards));}}, '.elements');
Promise.all([ apiConnect.getUserData(), apiConnect.getInitialCards()]).then(([ userProfileData, initialCards]) => {
  userId = userProfileData._id;
  section.renderItems(initialCards);
  userInfo.setUserInfo(userProfileData);
  userInfo.setUserAvatar(userProfileData);
})
.catch((err) => { console.log(`Возникла глобальная ошибка, ${err}`) })

const popupEditeProfile = new PopupWithForm('#popup-edit', {
  callbackFormSubmit: (userProfileData) => { popupEditeProfile.putSavingProcessText(); apiConnect.sendUserData(userProfileData)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupEditeProfile.close();
    })
    .catch((err) => { console.log(`При редактировании профиля возникла ошибка, ${err}`) })
    .finally(() => {
      popupEditeProfile.returnSavingProcessText();
    })
  }
});
popupEditeProfile.setEventListeners();

const popupAddCard = new PopupWithForm('#popup-image', {
  callbackFormSubmit: (initialCards) => {
    popupAddCard.putSavingProcessText(); 
    apiConnect.addNewCard(initialCards)
    .then((card) => {
      section.addItem(createCard(card)); 
      popupAddCard.close();
    })
    .catch((err) => { console.log(`При добавлении новой карточки возникла ошибка, ${err}`) })
    .finally(() => {
      popupAddCard.returnSavingProcessText();
    })
  }
});
popupAddCard.setEventListeners();

const popupEditeAvatar = new PopupWithForm('#popup-avatar', {
  callbackFormSubmit: (userProfileData) =>{
    popupEditeAvatar.putSavingProcessText(); 
    apiConnect.sendAvatarData(userProfileData)
    .then((res) => {
      userInfo.setUserAvatar(res);
      popupEditeAvatar.close();
    })
    .catch((err) => { console.log(`При обновлении аватара возникла ошибка, ${err}`) })
    .finally(() => {
      popupEditeAvatar.returnSavingProcessText();
    })
  }
});
popupEditeAvatar.setEventListeners();

const popupNoticeDelete = new PopupNotice("#delete-card", {
  callbackNotice: (cardElement, cardId) => { 
    apiConnect.deleteCard(cardId)
    .then(() => {
      cardElement.handleDeleteClick();
      popupNoticeDelete.close();
    })
    .catch((err) => { console.log(`При удалении карточки возникла ошибка, ${err}`) })
  }
});
popupNoticeDelete.setEventListeners();


const popupImage = new PopupWithImage('#popup-zoom');
popupImage.setEventListeners();

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

const formValidatorAvatar= new FormValidator(configValidation, formElementAddAvatar);
formValidatorAvatar.enableValidation(); 

buttomavatar.addEventListener('click', function(){
  popupEditeAvatar.open();
  formValidatorAvatar.resetValidation();
});

buttompensil.addEventListener('click', function(){
  popupEditeProfile.open();
  formValidator.resetValidation();
  const actualUserInfo = userInfo.getUserInfo();
  text.value = actualUserInfo.username;
  type.value = actualUserInfo.usersubtitle;
});

buttomplus.addEventListener('click', function(){
  popupAddCard.open();
  formValidatorImage.resetValidation();
});