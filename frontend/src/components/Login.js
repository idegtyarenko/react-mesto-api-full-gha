import React from 'react';

import AuthForm from './AuthForm';

export default function Login (props) {
  return (
    <main className="main auth">
      <h1 className="auth__title">Вход</h1>
      <AuthForm
        submitButtonName="Войти"
        {...props}
      />
      <p className="auth__hint" />
    </main>
  );
}
