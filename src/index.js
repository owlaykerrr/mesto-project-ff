import "./pages/index.css";
import "./blocks/popup/popup.css";
import { isLikeCard, deletelikeCard, createCard, deleteCard, delLikeCard, handLikeClick} from "./components/card.js";
import { initialCards } from "./components/cards.js";
import { openPopup } from "./components/modal.js";
import { closePopupListener } from "./components/modal.js";
import { closePopup } from "./components/modal.js";
import { enableValidation } from "./components/validation.js";
import { clearValidation } from "./components/validation.js";
import {validationConfig} from "./components/validation.js"
import { config } from "./components/api.js";
import { getInitialCards } from "./components/api.js";
import { getUserInfo } from "./components/api.js";
import { saveDataProfile } from "./components/api.js";
import { addNewCardPost } from "./components/api.js";
import { changeAvatar } from "./components/api.js";

const galleryPlace = document.querySelector(".places__list");
const popupEdit = document.querySelector(".popup_type_edit"); //кнопка и попап редактирования профиля
const editFormButton = popupEdit.querySelector('.popup__button');

const editButton = document.querySelector(".profile__edit-button");
const popupAdd = document.querySelector(".popup_type_new-card"); //попапы редактирования, кнопки добавить и картинки
const addFormButton = popupAdd.querySelector(".popup__button");
const profileAddButton = document.querySelector(".profile__add-button");
const imageCard = document.querySelector(".popup_type_image");
const imagePopup = imageCard.querySelector(".popup__image")
const closeButton = document.querySelector(".popup__close"); //главные постоянные попапов
const popupMain = document.querySelector(".popup");
export const formNamePage = document.querySelector('.profile__title') //имя пользователя и подпись
export const formJobPage = document.querySelector('.profile__description')//занятие
const formAvatarPage = document.querySelector('.profile__image') // аватар
const formElement = document.forms["edit-profile"];
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;
const formImageAdd = document.forms["new-place"];
const placeNameInput = formImageAdd.querySelector(".popup__input_type_card-name");
const linkNameInput = formImageAdd.querySelector(".popup__input_type_url");
const imageCaption = imageCard.querySelector(".popup__caption");
const deleteButton = document.querySelector(".card__delete-button");
const avatarButton = document.querySelector(".profile__image");

const avatarPopup = document.querySelector(".popup_type_avatar")
const avatarForm = document.forms["change-avatar"]
const avatarInput = avatarForm.querySelector(".popup__input_type_avatar");
const avatarFormButton = avatarPopup.querySelector('.popup__button');

//вывод карточек с сервера
Promise.all([getInitialCards(), getUserInfo()])
.then (([cards, userData]) => {
    cards.forEach((card) => {
      const cardElement = createCard(
        card.name, card.link, card.likes, card._id, userData._id, deleteCard, handLikeClick, openImageWindow);
        
        if(card.owner._id !== userData._id) {
         cardElement.querySelector('.card__delete-button').classList.add('card__delete-button_inactive');
        }
        galleryPlace.prepend(cardElement);
    })

   formNamePage.textContent = userData.name;
   formJobPage.textContent = userData.about;
   avatarButton.style.backgroundImage = `url(${userData.avatar})`;
})
.catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
})




editButton.addEventListener("click", () => {
  openPopup(popupEdit);
  renderLoading(false);
  clearValidation(formElement, validationConfig);
  nameInput.value = formNamePage.textContent;
  jobInput.value  = formJobPage.textContent;
});




profileAddButton.addEventListener("click", () => {
  openPopup(popupAdd);
  renderLoading(false);
  clearValidation(formImageAdd, validationConfig);
  placeNameInput.value = "";
  linkNameInput.value = "";

  if([placeNameInput === ""]) {
   formImageAdd.querySelector(validationConfig.submitButtonSelector).classList.add(validationConfig.inactiveButtonClass);
   formImageAdd.querySelector(validationConfig.submitButtonSelector).disabled = true; 
  }
});


closePopupListener(popupEdit);
closePopupListener(popupAdd);
closePopupListener(imageCard);
closePopupListener(avatarPopup);


// обработчик для кнопки сохранить при редактировании профиля
formElement.addEventListener('submit', handleFormSubmit); 

// обработчик для кнопки добавления картинки
formImageAdd.addEventListener("submit", addImageSubmitButton); 


// функция добавления карточки по кнопке
 function addImageSubmitButton(evt) {
  evt.preventDefault();
  renderLoading(true);
  addNewCardPost(placeNameInput, linkNameInput)
  .then((res) => {
    console.log(res)
    const name = placeNameInput.value;
    const link = linkNameInput.value;
    const likes = res.likes;
    const likeCount = res.likes.length;
    const cardId = res._id;
    const userId = res.owner._id;
  const cardElement = createCard(
    name,
    link,
    likes,
    cardId,
    userId,
    deleteCard,
    handLikeClick,
    openImageWindow,
  );

  addCard(cardElement);
 
  formImageAdd.reset();
  closePopup(popupAdd);
   })
}


//функция добавления карточки первой.
function addCard(card) {
  galleryPlace.prepend(card);
}


//функция отправки формы редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault();

  renderLoading(true, editFormButton);

  saveDataProfile(nameInput, jobInput)
  .then((res) => {
    formNamePage.textContent = nameInput.value;
    formJobPage.textContent = jobInput.value;
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    
  });
  closePopup(popupMain);
}


//функция открытия окна картинки 
export function openImageWindow(name, link) {
  openPopup(imageCard);
  imageCaption.textContent = name;
  imagePopup.src = link;
  imagePopup.setAttribute("alt", "На фотографии " + name);
}


// настройки валидации передаются при вызове этой функции.
enableValidation(validationConfig);



//открытие попапа аватарки
avatarButton.addEventListener("click", () => {
  openPopup(avatarPopup);
  clearValidation(avatarForm, validationConfig);
  avatarInput.value = "";
})


//кнопка сохранить в аватарке
function addAvatarSubmitButton(evt) {
evt.preventDefault();
renderLoading(true);
changeAvatar(avatarInput)
.then((res) => {
console.log(res);
avatarButton.style.backgroundImage = `url(${avatarInput.value})`;
})
.catch((res) => {
  console.log(res);
})
.finally(() => {
  renderLoading(false);
})
closePopup(avatarPopup);
}

//кнопка сабмит формы в аватарке
avatarForm.addEventListener('submit', addAvatarSubmitButton); 


//прелоадер
function renderLoading(isLoading) {
if (isLoading) {
editFormButton.textContent = 'Сохранение...';
addFormButton.textContent = 'Сохранение...';
avatarFormButton.textContent = 'Сохранение...';
}
else {
  editFormButton.textContent = 'Сохранить';
  addFormButton.textContent = 'Сохранить';
  avatarFormButton.textContent = 'Сохранить';
}
}