import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import useFormValidation from '../hooks/useFormValidation.js';

import Popup from './Popup';
import PopupWithForm from './PopupWithForm';

export default function EditProfilePopup ({
  state,
  onClose,
  onUpdateAvatar
}) {

  const currentUser = React.useContext(CurrentUserContext);
  const { values, errors, isValid, handleChange, resetForm } = useFormValidation();

  React.useEffect(() => {
    state.isOpen && resetForm(currentUser);
  }, [state, resetForm, currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar(values.avatar);
  }

  return (
    <Popup state={state} onClose={onClose}>
      <PopupWithForm
        state={state}
        title="Обновить аватар"
        submitButtonText="Сохранить"
        onClose={onClose}
        onSubmit={handleSubmit}
        isValid={isValid}
      >
        <div className="form__field">
          <input
            className="form__input"
            value={values.avatar || ''}
            onChange={handleChange}
            type="url"
            name="avatar"
            placeholder="Ссылка на аватар"
            required
          />
          <p className="form__input-error">{errors.avatar}</p>
        </div>
      </PopupWithForm>
    </Popup>
  );
}
