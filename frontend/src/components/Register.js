import { Link } from 'react-router-dom';

import AuthForm from './AuthForm';

export default function Register (props) {
  return (
    <main className="main auth">
      <h1 className="auth__title">Регистрация</h1>
      <AuthForm
        submitButtonName="Зарегистрироваться"
        {...props}
      />
      <p className="auth__hint">
        Уже зарегистрированы? <Link className="button button_type_text-only" to="/sign-in">
          Войти
        </Link>
      </p>
    </main>
  );
}
