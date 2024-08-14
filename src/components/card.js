const cardTemplate = document.querySelector("#card-template").content;


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


