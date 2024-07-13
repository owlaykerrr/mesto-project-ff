// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector("#card-template").content;
const galleryPlace = document.querySelector(".places__list");

function createCard(name, link, deleteCard) {
  const card = cardTemplate.cloneNode(true);

  card.querySelector(".card__title").textContent = name;
  card.querySelector(".card__image").src = link;
  const deleteButton = card.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", deleteCard);

  function deleteCard(event) {
    event.target.closest(".card").remove();
  }

  return card;
}

initialCards.forEach((card) => {
  const newCard = createCard(card.name, card.link, card.deleteCard);
  galleryPlace.append(newCard);
});
