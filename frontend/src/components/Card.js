import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card ({
  card,
  onImageClick,
  onCardLike,
  onCardDelete
}) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `button places__like-icon ${isLiked && 'places__like-icon_active'}`
  );
  const handleImageClick = () => {
    onImageClick(card);
  }
  const handleLikeClick = () => {
    onCardLike(card);
  }
  const handleDeleteClick = () => {
    onCardDelete(card);
  }

  return (
    <article className="places__place">
      <img
        className="places__place-photo"
        src={card.link}
        alt={`Фотография места «${card.name}»`}
        onClick={handleImageClick}
      />
      {isOwn && <button
        className="button places__delete-icon"
        onClick={handleDeleteClick}
        type="button"
        aria-label="Удалить"
      />}
      <div className="places__name-wrapper">
        <h2 className="places__place-name">{card.name}</h2>
        <div>
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
            aria-label="Отметить понравившимся"
          />
          <p className="places__likes-count">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}
