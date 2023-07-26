import React from 'react';
import Popup from './Popup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import useFormValidation from '../hooks/useFormValidation.js';

import PopupWithForm from './PopupWithForm';

export default function EditProfilePopup ({
  state,
  onClose,
  onUpdateUser
}) {

  const currentUser = React.useContext(CurrentUserContext);
  const { values, errors, isValid, handleChange, resetForm } = useFormValidation();

  React.useEffect(() => {
    state.isOpen && resetForm(currentUser);
  }, [state, resetForm, currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.about
    });
  }

  return (
    <Popup state={state} onClose={onClose}>
      <PopupWithForm
        state={state}
        title="Редактировать профиль"
        submitButtonText="Сохранить"
        onClose={onClose}
        onSubmit={handleSubmit}
        isValid={isValid}
      >
        <div className="form__field">
          <input
            className="form__input"
            type="text"
            name="name"
            value={values.name || ''}
            onChange={handleChange}
            placeholder="Имя"
            required
            minLength="2"
            maxLength="40"
          />
          <p className="form__input-error">{errors.name}</p>
        </div>
        <div className="form__field">
          <input
            className="form__input"
            type="text"
            name="about"
            value={values.about || ''}
            onChange={handleChange}
            placeholder="Кратко о себе"
            required
            minLength="2"
            maxLength="200"
          />
          <p className="form__input-error">{errors.about}</p>
        </div>
      </PopupWithForm>
    </Popup>
  );
}
