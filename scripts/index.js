// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector("#card-template").content;
const galleryPlace = document.querySelector(".places__list");



function createCard(name, link) {
  const card = cardTemplate.cloneNode(true);

  card.querySelector(".card__title").textContent = name;
  card.querySelector(".card__image").src = link;
  card.querySelector(".card__image").setAttribute("alt","Фото с видом на " + name);
  const deleteButton = card.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", deleteCard);

 

  return card;
}

  function deleteCard(event) {
    event.target.closest(".card").remove();
  }



initialCards.forEach((card, deleteCard) => {
  galleryPlace.append(createCard(card.name, card.link, deleteCard));
});
