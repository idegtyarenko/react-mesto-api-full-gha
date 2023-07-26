import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Profile ({
  handleEditProfile,
  handleEditAvatar,
  handleAddPlace
}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <section className="profile" aria-label="Профиль">
      <div className="profile__avatar-wrapper">
        <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
        <button
          className="button profile__avatar-button"
          type="button"
          aria-label="Обновить аватар"
          onClick={handleEditAvatar}
        />
      </div>
      <div className="profile__text-wrapper">
        <div className="profile__name-wrapper">
          <h1 className="profile__name">{currentUser.name || 'Загрузка…'}</h1>
          {currentUser.name && (
            <button
              className="button button_type_black-outlined button_body-size_s
              profile__button profile__button_role_edit"
              type="button"
              aria-label="Редактировать профиль"
              onClick={handleEditProfile}
            />
          )}
        </div>
        <p className="profile__title">{currentUser.about}</p>
      </div>
      <button
        className="button button_type_black-outlined button_body-size_l
        profile__button profile__button_role_add"
        type="button"
        aria-label="Добавить новое место"
        onClick={handleAddPlace}
      />
    </section>
  );
}
