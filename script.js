let buttompensil = document.querySelector('.profile__button-pensil');
let element = document.querySelector('.popup');
let buttomexit = document.querySelector('.popup__exit');
let formElement = document.querySelector('.popup__form');
let text = document.querySelector('.popup__input_text');
let type=document.querySelector('.popup__input_status');  
let title = document.querySelector('.profile__title'); 
let subtitle=document.querySelector('.profile__subtitle');
function showClick() {
  element.classList.add('popup_opened');
  }

function showClickexit() {
  element.classList.remove('popup_opened');
  }
 
function handleFormSubmit (evt) {
  evt.preventDefault();
  let textvalue = text.value;
  let typevalue = type.value;
  title.textContent=textvalue;
  subtitle.textContent=typevalue;
  showClickexit();
  }
text.value= title.textContent;
type.value= subtitle.textContent;
buttomexit.addEventListener('click', showClickexit); 
buttompensil.addEventListener('click', showClick); 
formElement.addEventListener('submit', handleFormSubmit);  