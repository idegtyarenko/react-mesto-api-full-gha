import React from 'react';
import PopupWithForm from "./PopupWithForm";

export default function DeletePlacePopup (props) {
  return (
    <PopupWithForm
      { ...props }
      title="Вы уверены?"
      submitButtonText="Да"
      isValid={true}
    />
  );
}
