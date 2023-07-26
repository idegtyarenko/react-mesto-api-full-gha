import useFormValidation from '../hooks/useFormValidation';

export default function AuthForm ({
  handleSubmit,
  isAwaitingResponse,
  submitButtonName
}) {
  const { values, errors, isValid, handleChange } = useFormValidation();

  function handleFormSubmit (evt) {
    evt.preventDefault();
    handleSubmit(values.email, values.password);
  }

  return (
    <form
      className="form auth__form"
      onSubmit={handleFormSubmit}
      noValidate
    >
      <div className="form__field">
        <input
          className="form__input form__input_theme_dark"
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="Email"
          required
          maxLength="64"
        />
        <p className="form__input-error form__input-error_theme_dark">{errors.email}</p>
      </div>
      <div className="form__field">
        <input
          className="form__input form__input_theme_dark"
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Пароль"
          required
          minLength="6"
          maxLength="64"
        />
        <p className="form__input-error  form__input-error_theme_dark">{errors.password}</p>
      </div>
      <button
        className={`button button_type_white button_body-size_l${
          !isValid ? ' button_type_white-disabled' : ''
        }`}
        type="submit"
        disabled={!isValid}
      >
        {isAwaitingResponse ? 'Загрузка…' : submitButtonName}
      </button>
    </form>
  );
}
