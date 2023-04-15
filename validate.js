const configValidation={
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}; 

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, configValidation) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.add(configValidation.inputErrorClass);
  // Заменим содержимое span с ошибкой на переданный параметр
  errorElement.textContent = errorMessage;
  errorElement.classList.add(configValidation.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, configValidation) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.remove(configValidation.inputErrorClass);
  errorElement.classList.remove(configValidation.errorClass);
  errorElement.textContent = '';
}; 

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, configValidation) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage, configValidation);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement, configValidation);
  }
};

function setEventListeners(formElement, configValidation) {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(configValidation.inputSelector));
  const buttonElement = formElement.querySelector(configValidation.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, configValidation);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, configValidation)
      toggleButtonState(inputList, buttonElement, configValidation);
      });
  });
}; 

const enableValidation = (configValidation) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(configValidation.formSelector));
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement, configValidation);
  });
};
  
// Вызовем функцию
function hasInvalidInput(inputList){
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
}
  
function toggleButtonState(inputList, buttonElement, configValidation){
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(configValidation.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove(configValidation.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}
enableValidation(configValidation); 