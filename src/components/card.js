import { openPopup } from "./modal";

const cardTemplate = document.querySelector("#card-template").content;
const imageCard = document.querySelector(".popup_type_image");
const imageCaption = imageCard.querySelector(".popup__caption");


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
    openImageWindow(name, link);
  });

  return card;
}

//функция открытия окна картинки 
export function openImageWindow(name, link) {
  openPopup(imageCard);
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

// лайк карточки
export function isLikeCard(event) {
  if (event.target.classList.contains("card__like-button")) {
    event.target.classList.toggle("card__like-button_is-active");
  }
}


