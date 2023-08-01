import React from 'react';

export default function PageError ({ errorMessage, fetchData }) {
  return (
    <section className="profile" aria-label="Ошибка загрузки">
      <div id="page-error" className="error profile__text-wrapper">
        <p className="error__title">Не удалось загрузить данные</p>
        <p className="error__message">{errorMessage}</p>
        <button
          id="page-reload-button"
          className="error__reload-button button button_body-size_s button_type_black-outlined"
          onClick={fetchData}
        >
          Попробовать снова
        </button>
      </div>
    </section>
  );
}
