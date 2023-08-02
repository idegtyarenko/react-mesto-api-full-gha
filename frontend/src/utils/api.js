class Api {
  constructor ({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _makeUrl (path, params) {
    let url = `${this.baseUrl}/${path}`;
    if (params) {
      url += '?' + params;
    }
    return url;
  }

  _makeFetchParams (path, method, bodyObj) {
    const params = {
      method: method,
      headers: this.headers,
      body: JSON.stringify(bodyObj)
    };
    return [this._makeUrl(path), params];
  }

  _fetchResource (path, method, bodyObj) {
    return fetch(...this._makeFetchParams(path, method, bodyObj))
    .then(res => {
      if (!res.ok) {
        return Promise.reject(`Код ошибки: ${res.status}`);
      }
      return res.json();
    });
  }

  getProfileData () {
    return this._fetchResource('users/me');
  }

  updateProfileData (data) {
    return this._fetchResource('users/me', 'PATCH', data);
  }

  getCards () {
    return this._fetchResource('cards');
  }

  createCard (data) {
    return this._fetchResource('cards', 'POST', data);
  }

  deleteCard (id) {
    return this._fetchResource('cards/' + id, 'DELETE');
  }

  _addLike (cardId) {
    return this._fetchResource(`cards/${cardId}/likes`, 'PUT');
  }

  _removeLike (cardId) {
    return this._fetchResource(`cards/${cardId}/likes`, 'DELETE');
  }

  changeLikeCardStatus = (cardId, newLikedStatus) =>
    newLikedStatus ? this._addLike(cardId) : this._removeLike(cardId);

  updateAvatar (url) {
    return this._fetchResource(`users/me/avatar`, 'PATCH', {avatar: url});
  }

}

export const api = new Api({
  baseUrl: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});
