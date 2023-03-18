let buttompensil = document.querySelector('.profile__button_pensil');
let element = document.querySelector('.popup');
let elements = document.querySelector('#elements');
let buttomelement = document.querySelector('.element__button');
let buttomexit = document.querySelector('.popup__exit');
let formElement = document.querySelector('.popup__form');
let text = document.querySelector('.popup_input_type_text');
let type=document.querySelector('.popup_input_type_status');  
let title = document.querySelector('.profile__title'); 
let subtitle=document.querySelector('.profile__subtitle');
function showClick() {
  element.classList.add('popup_opened');
}
function showClick2() {
  buttomelement.classList.add('element__buttom_active');
  }
function showClick1() {
  element.classList.remove('popup_opened');
  }
function handleFormSubmit (evt) {
  evt.preventDefault();
  let textt = text.value;
  let typee = type.value;
  title.textContent=textt;
  subtitle.textContent=typee;
  showClick1();
  }
text.value= title.textContent;
type.value= subtitle.textContent;
buttomexit.addEventListener('click', showClick1); 
buttompensil.addEventListener('click', showClick); 
buttomelement.addEventListener('click', showClick2); 
formElement.addEventListener('submit', handleFormSubmit);  