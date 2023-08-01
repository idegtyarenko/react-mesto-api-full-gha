import React from 'react';

import Popup from "./Popup";

export default function ImagePopup ({ state, onClose }) {

  const { name, link } = state.card ?? {};

  return (
    <Popup state={{'name': 'image', isOpen: state.isOpen }} onClose={onClose}>
      <figure className="lightbox popup__container">
        <button
          className="button popup__close-button popup__close"
          type="button"
          aria-label="Закрыть диалог"
          onClick={onClose}
        />
        <img
          className="lightbox__image popup__close"
          src={link}
          alt={`Фотография места «${name}»`}
        />
        <figcaption className="lightbox__caption">{name}</figcaption>
      </figure>
    </Popup>
  );
}
