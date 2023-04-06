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
const buttomexit = document.querySelector('.popup__exit');
const formElement = document.querySelector('.popup__form');
const text = document.querySelector('.popup__input_type_text');
const type=document.querySelector('.popup__input_type_status');  
const title = document.querySelector('.profile__title'); 
const subtitle=document.querySelector('.profile__subtitle');
const buttomplus = document.querySelector('.profile__button-plus');
const popupAddImage = document.querySelector('.popup_image');
const popupUpdate = document.querySelector('.popup_edit');
const buttomexitAddImage = document.querySelector('.popup__exit_image');
const nameImage = document.querySelector('.popup__input_type_name');
const srcImage=document.querySelector('.popup__input_type_src');
const formElementAdd = document.querySelector('.popup__form_image');
const buttomexitZoom = document.querySelector('.popup__exit_zoom');
const popupZoomImage=document.querySelector('.popup_zoom');
const elements=document.querySelector('.elements');
const titleZoom=document.querySelector('.popup__title-zoom');
const popupImage=document.querySelector('.popup__image');
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
}

const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
}

buttompensil.addEventListener('click', function(){
  openPopup(popupUpdate);
  text.value= title.textContent;
  type.value= subtitle.textContent;
});

buttomexit.addEventListener('click', function(){
  closePopup(popupUpdate);
});

buttomplus.addEventListener('click', function(){
  openPopup(popupAddImage);
});

buttomexitAddImage.addEventListener('click', function(){
  closePopup(popupAddImage);
});

formElement.addEventListener('submit', function(evt) {
  evt.preventDefault();
  let textvalue = text.value;
  let typevalue = type.value;
  title.textContent=textvalue;
  subtitle.textContent=typevalue;
  closePopup(popupUpdate);
});

function createCard(a) {
  const imageTemplate = document.querySelector('#element-template').content;
  const image = imageTemplate.querySelector('.element__item').cloneNode(true);
  const imageZoom=image.querySelector('.element__image');
  const detetebutton=image.querySelector('.element__button-delete');
  const likebutton=image.querySelector('.element__button');
  detetebutton.addEventListener('click', ()=>{
    image.remove();
  });
  likebutton.addEventListener('click', ()=>{
    likebutton.classList.toggle('element__button_active');
  });
  imageZoom.addEventListener('click', function(){
    openPopup(popupZoomImage);
    titleZoom.textContent=a.name;
    popupImage.alt=a.name;
    popupImage.src=a.link;
  }); 
  image.querySelector('.element__title').textContent=a.name;
  image.querySelector('.element__image').alt=a.name;
  image.querySelector('.element__image').src=a.link;
  return image;
}

initialCards.forEach(elem=>{
  let newImage = createCard(elem);
  elements.append(newImage);
});

formElementAdd.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const newImage = createCard({
    name: nameImage.value,
    link: srcImage.value
  });
  elements.prepend(newImage);
  closePopup(popupAddImage);
  evt.target.reset();
});  
buttomexitZoom.addEventListener('click', function(){
  closePopup(popupZoomImage);
}); 