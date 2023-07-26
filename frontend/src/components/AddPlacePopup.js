import React from 'react';
import useFormValidation from '../hooks/useFormValidation.js';

import Popup from './Popup';
import PopupWithForm from './PopupWithForm';

export default function EditProfilePopup ({
  state,
  onClose,
  onAddPlace
}) {

  const { values, errors, isValid, handleChange, resetForm } = useFormValidation();

  React.useEffect(() => {
    state.isOpen && resetForm({name: '', link: ''});
  }, [state, resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: values.name,
      link: values.link
    });
  }

  return (
    <Popup state={state} onClose={onClose}>
      <PopupWithForm
        state={state}
        title="Новое место"
        submitButtonText="Создать"
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
            placeholder="Название"
            required
            minLength="2"
            maxLength="30"
          />
          <p className="form__input-error">{errors.name}</p>
        </div>
        <div className="form__field">
          <input
            className="form__input"
            type="url"
            name="link"
            value={values.link || ''}
            onChange={handleChange}
            placeholder="Ссылка на картинку"
            required
          />
          <p className="form__input-error">{errors.link}</p>
        </div>
      </PopupWithForm>
    </Popup>
  );
}
