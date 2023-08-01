import React from "react";

import Popup from "./Popup";

export default function PopupWithForm (props) {

  const {
    state,
    title,
    submitButtonText,
    onClose,
    children,
    onSubmit,
    isValid
  } = props;

  const {name: popupName, errorMessage, isAwaitingResponse} = state;

  return (
    <Popup { ...props }>
      <div className="popup__container popup__container_type_whitebox popup__container_padding_s">
        <button
          className="button popup__close-button popup__close"
          type="button"
          aria-label="Закрыть диалог"
          onClick={onClose}
        />
        <h2 className="popup__title">
          {title}
        </h2>
        <p className="popup__error">
          {errorMessage}
        </p>
        <form
          className="form"
          name={popupName}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
            className={`button button_type_black button_body-size_l${
              !isValid ? ' button_type_black-disabled' : ''
            }`}
            type="submit"
            disabled={!isValid}
          >
            {isAwaitingResponse ? 'Загрузка…' : submitButtonText}
          </button>
        </form>
      </div>
    </Popup>
  );
}
