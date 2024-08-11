import { closePopup } from "./modal";
import { openPopup } from "./modal";

const cardTemplate = document.querySelector("#card-template").content;
const galleryPlace = document.querySelector(".places__list");
export const formImageAdd = document.forms["new-place"];

const placeNameInput = formImageAdd.querySelector(
  ".popup__input_type_card-name"
);
const linkNameInput = formImageAdd.querySelector(".popup__input_type_url");
const popupAdd = document.querySelector(".popup_type_new-card");
const imageCard = document.querySelector(".popup_type_image");

export function createCard(
  name,
  link,
  deleteCard,
  isLikeCard,
  openImageWindow
) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector(".card__title").textContent = name;
  card.querySelector(".card__image").src = link;
  card
    .querySelector(".card__image")
    .setAttribute("alt", "Фото с видом на " + name);
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  const cardButton = card.querySelector(".card__image");

  deleteButton.addEventListener("click", deleteCard);
  likeButton.addEventListener("click", isLikeCard);

  cardButton.addEventListener("click", () => {
    openPopup(imageCard);
    openImageWindow(name, link);
  });

  return card;
}

//функция открытия окна картинки 
export function openImageWindow(name, link) {
  const imageCaption = imageCard.querySelector(".popup__caption");
  imageCaption.textContent = name;
  imageCard.querySelector(".popup__image").src = link;
  imageCard
    .querySelector(".popup__image")
    .setAttribute("alt", "На фотографии " + name);
}

//функция удаления карточки
export function deleteCard(event) {
  event.target.closest(".card").remove();
}

// лайк
export function isLikeCard(event) {
  if (event.target.classList.contains("card__like-button")) {
    event.target.classList.toggle("card__like-button_is-active");
  }
}

// функция добавления карточки по кнопке
export function imageFormSubmit(evt) {
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


export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
