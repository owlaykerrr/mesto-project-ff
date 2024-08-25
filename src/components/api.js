import { checkResponse } from "./utils/checkresponse";

//все запросы нужно присвоить переменным и экспортировать их.

//универсальная функция запроса с проверкой ответа
function request(url, options) {
  return fetch(url, options).then(checkResponse)
}

//конфиг
export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-20",
  headers: {
    authorization: "0bad48d3-e1c6-4d63-b20d-e1ce121714d2",
    "Content-Type": "application/json",
  },
};

//функция запроса инфы о пользователе
export function getUserInfo() {
  return request(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  })
}

//функция запроса на сервер карточек
export function getInitialCards() {
  return request(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  })
}

//запрос отредактированных данных пользователя для сохранения

export function saveDataProfile(dataName, dataAbout) {
  return request(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: dataName.value,
      about: dataAbout.value,
    }),
  })    
}

//смена аватарки
export function changeAvatar(avatarInput) {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarInput.value,
    }),
  })
}

//запрос отправки данных для добавления новой карточки
export function addNewCardPost(cardName, cardUrl) {
  return request(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardName.value,
      link: cardUrl.value,
    })
  })
}

//запрос на удаление карточки
export function delRequestCard(cardId) {
  return request(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
}

//лайк/дизлайк
export function changeLike(cardId, like) {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: like ? "PUT" : "DELETE",
    headers: config.headers,
  })
}
