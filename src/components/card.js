import { delRequestCard } from "./api.js";
import { toLikeCard } from "./api.js";
import { unlikeCard } from "./api.js";
import { changeLike } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;

export function handLikeClick(cardId, likeButton, likeCount) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  changeLike(cardId, !isLiked)
    .then((res) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likeCount.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(`ошибка лайка: ${err}`);
    });

    
}

export function createCard(
  name,
  link,
  likes,
  cardId,
  ownerId,
  userId,
  deleteCard,
  handLikeClick,
  openImageWindow
) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector(".card__title").textContent = name;
  card.querySelector(".card__image").src = link;
  const likeCount = card.querySelector(".card__like-count");
  likeCount.textContent = likes.length;
  card
    .querySelector(".card__image")
    .setAttribute("alt", "Фото с видом на " + name);
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  const cardButton = card.querySelector(".card__image");
  const cardElement = card.querySelector(".card");

  deleteButton.addEventListener("click", () => {
    deleteCard(cardId, cardElement);
  });

  //проверка на мои карточки 
  if(ownerId !== userId) {
    cardElement.querySelector('.card__delete-button').classList.add('card__delete-button_inactive');
   }
  
  //ПРОВЕРКА НА ЛАЙК.
  if(likes.find(like => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }


  likeButton.addEventListener("click", () => {
    handLikeClick(cardId, likeButton, likeCount);
  });

  cardButton.addEventListener("click", () => {
    openImageWindow(name, link);
  });

  return card;
}

//функция удаления карточки
export function deleteCard(cardId, cardElement) {
  delRequestCard(cardId)
    .then((res) => {
      console.log(res);
      cardElement.remove();
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен; ", err);
    });
}
