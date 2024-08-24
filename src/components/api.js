//все запросы нужно присвоить переменным и экспортировать их.

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
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  })
    .then(res => {
       if (res.ok) {
      return res.json();
      }
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен; ", err);
    });
}

//функция запроса на сервер карточек
export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
       return res.json(); 
      }  
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен; ", err);
    });
}

//запрос отредактированных данных пользователя для сохранения

export function saveDataProfile(dataName, dataAbout) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: dataName.value,
      about: dataAbout.value,
    }),
  })
    .then(res => {
      if (res.ok) {
       return res.json(); 
      }  
    })
    .catch((err) => {
      console.log(err);
    });
}

//смена аватарки
export function changeAvatar(avatarInput) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarInput.value,
    }),
  })
    .then(res => {
      if (res.ok) {
       return res.json(); 
      }  
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен; ", err);
    });
}

//запрос отправки данных для добавления новой карточки
export function addNewCardPost(cardName, cardUrl) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardName.value,
      link: cardUrl.value,
    }),
  })
    .then(res => {
      if (res.ok) {
       return res.json(); 
      }
      
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен; ", err);
    });
}

//запрос на удаление карточки
export function delRequestCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
       return res.json(); 
      }
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен; ", err);
    });
}

//лайк/дизлайк
export function changeLike(cardId, like) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: like ? "PUT" : "DELETE",
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
       return res.json(); 
      }
      
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен; ", err);
    });
}
