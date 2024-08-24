
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


//кнопка закрытия своя для каждого попапа
export const closePopupListener = (popupElement) => {
  const closeButton = popupElement.querySelector(".popup__close"); 
  closeButton.addEventListener("click", () => {
    closePopup(popupElement);
  });

  popupElement.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("popup")) {
      closePopup(popupElement);
    }
  });

};



