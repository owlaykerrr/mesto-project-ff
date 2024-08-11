//кнопка и попап редактирования профиля
const editButton = document.querySelector(".profile__edit-button");

//кнопка и попап плюсика
const profileAddButton = document.querySelector(".profile__add-button");

//главные постоянные попапов
const closeButton = document.querySelector(".popup__close"); //крестик
export const popupMain = document.querySelector(".popup"); //главный класс

//закрытие на эскейп
const handleEscKeyUp = (event) => {
  if (event.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closePopup(popup);
  }
};

//открытие попапа
export function openPopup(popup) {
  popup.classList.add("popup_is-animated");
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscKeyUp);
}

// закрытие
export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscKeyUp);
}

export const closePopupListener = (popupElement) => {
  const closeButton = popupElement.querySelector(".popup__close"); // ищем кнопку крестик в попапе
  closeButton.addEventListener("click", () => {
    closePopup(popupElement);
  });

  popupElement.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("popup")) {
      closePopup(popupElement);
    }
  });
};

//постоянные для окна редактирования
export const formElement = document.forms["edit-profile"];
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;
const formNamePage = document.querySelector(".profile__title");
const formJobPage = document.querySelector(".profile__description");

//функция отправки формы
export function handleFormSubmit(evt) {
  evt.preventDefault();
  formNamePage.textContent = nameInput.value;
  formJobPage.textContent = jobInput.value;
  closePopup(popupMain);
}
