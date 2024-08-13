import "./pages/index.css";
import "./blocks/popup/popup.css";
import { isLikeCard, createCard, deleteCard, openImageWindow } from "./components/card.js";
import { initialCards } from "./components/cards.js";
import { openPopup } from "./components/modal.js";
import { closePopupListener } from "./components/modal.js";
import { closePopup } from "./components/modal.js";

const galleryPlace = document.querySelector(".places__list");
const popupEdit = document.querySelector(".popup_type_edit"); //кнопка и попап редактирования профиля
const editButton = document.querySelector(".profile__edit-button");
const popupAdd = document.querySelector(".popup_type_new-card"); //попапы редактирования, кнопки добавить и картинки
const profileAddButton = document.querySelector(".profile__add-button");
const imageCard = document.querySelector(".popup_type_image");
const closeButton = document.querySelector(".popup__close"); //главные постоянные попапов
const popupMain = document.querySelector(".popup");
const popupButton = document.querySelector(".popup__button");
const formNamePage = document.querySelector('.profile__title') //имя пользователя и подпись
const formJobPage = document.querySelector('.profile__description')
const formElement = document.forms["edit-profile"];
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;
const formImageAdd = document.forms["new-place"];
const placeNameInput = formImageAdd.querySelector(".popup__input_type_card-name");
const linkNameInput = formImageAdd.querySelector(".popup__input_type_url");



initialCards.forEach((card) => {
  galleryPlace.append(createCard(card.name, card.link, deleteCard, isLikeCard, openImageWindow));
});


editButton.addEventListener("click", () => {
  openPopup(popupEdit);
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
formImageAdd.addEventListener("submit", addImageSubmitButton); 

// функция добавления карточки по кнопке
 function addImageSubmitButton(evt) {
  evt.preventDefault();
  const name = placeNameInput.value;
  const link = linkNameInput.value;
  const newCard = createCard(
    name,
    link,
    deleteCard,
    isLikeCard,
    openImageWindow
  );
  addCard(newCard);
  formImageAdd.reset();
  closePopup(popupAdd);
}

//функция добавления карточки первой.
function addCard(card) {
  galleryPlace.prepend(card);
}

//функция отправки формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  formNamePage.textContent = nameInput.value;
  formJobPage.textContent = jobInput.value;
  closePopup(popupMain);
}
