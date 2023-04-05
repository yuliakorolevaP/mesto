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
let buttompensil = document.querySelector('.profile__button-pensil');
let buttomexit = document.querySelector('.popup__exit');
let formElement = document.querySelector('.popup__form');
let text = document.querySelector('.popup__input_type_text');
let type=document.querySelector('.popup__input_type_status');  
let title = document.querySelector('.profile__title'); 
let subtitle=document.querySelector('.profile__subtitle');
let buttomplus = document.querySelector('.profile__button-plus');
const popupAddImage = document.querySelector('.popup_image');
const popupUpdate = document.querySelector('.popup');
let buttomexitAddImage = document.querySelector('.popup__exit_image');
const AllImage=document.querySelector('.elements');
let nameImage = document.querySelector('.popup__input_type_name');
let srcImage=document.querySelector('.popup__input_type_src');
const formElementAdd = document.querySelector('.popup__form_image');
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

function addImage(a) {
  const imageTemplate = document.querySelector('#element-template').content;
  const image = imageTemplate.querySelector('.element__item').cloneNode(true);
  const imageZoom=image.querySelector('.element__image');
  const popupZoomImage=document.querySelector('.popup_zoom');
  let buttomexitZoom = document.querySelector('.popup__exit_zoom');
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
    document.querySelector('.popup__title_zoom').textContent=a.name;
    document.querySelector('.popup__image').alt=a.name;
    document.querySelector('.popup__image').src=a.link;
  }); 
  buttomexitZoom.addEventListener('click', function(){
    closePopup(popupZoomImage);
  }); 
  image.querySelector('.element__title').textContent=a.name;
  image.querySelector('.element__image').alt=a.name;
  image.querySelector('.element__image').src=a.link;
  AllImage.append(image);
  return image;
}

initialCards.forEach(elem=>{
  let newImage = addImage(elem);
  document.querySelector('.elements').append(newImage);
});

formElementAdd.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const newImage = addImage({
    name: nameImage.value,
    link: srcImage.value
  });
  document.querySelector('.elements').prepend(newImage);
  closePopup(popupAddImage);
});  


      




  


