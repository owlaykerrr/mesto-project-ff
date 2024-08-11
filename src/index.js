import "./pages/index.css";
import "./blocks/popup/popup.css";
import { closePopup } from "./components/modal.js";
import { isLikeCard, createCard, deleteCard, initialCards, openImageWindow } from "./components/card.js";
import { openPopup } from "./components/modal.js";
import { closePopupListener } from "./components/modal.js";
import { handleFormSubmit } from "./components/modal.js";
import { formElement} from "./components/modal.js"
import { imageFormSubmit } from "./components/card.js";
import { formImageAdd } from "./components/card.js";

const galleryPlace = document.querySelector(".places__list");

//кнопка и попап редактирования профиля
const popupEdit = document.querySelector(".popup_type_edit");
const editButton = document.querySelector(".profile__edit-button");

//попапы редактирования, кнопки добавить и картинки
const popupAdd = document.querySelector(".popup_type_new-card");
const profileAddButton = document.querySelector(".profile__add-button");
const imageCard = document.querySelector(".popup_type_image");

//главные постоянные попапов
const closeButton = document.querySelector(".popup__close");
const popupMain = document.querySelector(".popup");
const popupButton = document.querySelector(".popup__button");



//вывести карточки из массива на страницу
initialCards.forEach((card) => {
  galleryPlace.append(createCard(card.name, card.link, deleteCard, isLikeCard, openImageWindow));
});



editButton.addEventListener("click", () => {
  openPopup(popupEdit);
  const formElement = document.forms['edit-profile']
  const nameInput = formElement.elements.name;
  const jobInput = formElement.elements.description;
  const formNamePage = document.querySelector('.profile__title')
  const formJobPage = document.querySelector('.profile__description')
  nameInput.value = formNamePage.textContent;
  jobInput.value  = formJobPage.textContent;
});

profileAddButton.addEventListener("click", () => {
  openPopup(popupAdd);
});



closePopupListener(popupEdit);
closePopupListener(popupAdd);
closePopupListener(imageCard);


// обработчик для кнопки сабмит
formElement.addEventListener('submit', handleFormSubmit); 

// обработчик для кнопки добавления картинки
formImageAdd.addEventListener("submit", imageFormSubmit); 

