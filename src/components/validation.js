//валидация 

//ОБЬЕКТ С НАСТРОЙКАМИ ВАЛИДАЦИИ
  export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }; 
  
//функция которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error_visible');
  };
  
  //функция которая, удаляет класс с ошибкой
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__error_visible');
    errorElement.textContent = '';
  };
  
  //функция, которая проверяет валидность поля
  const isValid = (formElement, inputElement, validationConfig) => {
    if(inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    }
    else {
      inputElement.setCustomValidity("");
    }
  
  
    if(!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    }
    else {
      hideInputError(formElement, inputElement);
    }
  };
  
  
  //фукнция добавления обработчика всем полям формы
  const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, validationConfig)
  
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
  
  
  //добавление обработчика всем формам
  export const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
      setEventListeners(formElement);
    });
  };
  
  
  
  
  
  
  //проверка валидности полей
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
  
  //отключение включение кнопки
  const toggleButtonState = (inputList, buttonElement) => {
    if(hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add('popup__button_disabled');
    }
    else {
      buttonElement.disabled = false;
      buttonElement.classList.remove('popup__button_disabled');
    }
  };
  
  //очистка полей валидации
    export const clearValidation = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  
    inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
    });
  
  
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }