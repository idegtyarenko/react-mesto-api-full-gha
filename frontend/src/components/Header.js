import { Routes, Route, Link } from 'react-router-dom';
import logo_path from '../images/header_logo.svg';

export default function Header({
  userEmail,
  handleSignout
}) {
  return (
    <header className="header">
      <img className="header__logo" src={logo_path} alt="Логотип Mesto.Russia" />
      <Routes>
        <Route path="/sign-up" element={
          <Link to="/sign-in" className="button button_type_text-only header__text">Войти</Link>
        } />
        <Route path="/sign-in" element={
          <Link to="/sign-up" className="button button_type_text-only header__text">Регистрация</Link>
        } />
        <Route path="/" element={
          <>
            <p className="header__text header__email">{userEmail}</p>
            <button
              type="button"
              className="button button_type_text-only header__text header__logout"
              onClick={handleSignout}
            >
              Выйти
            </button>
          </>
        } />
      </Routes>
    </header>
  );
}
