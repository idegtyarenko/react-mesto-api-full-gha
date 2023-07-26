import React from 'react';
import Profile from './Profile.js';
import PageError from './PageError.js';
import Card from './Card.js';

export default function Main({
  onEditAvatar: handleEditAvatar,
  onEditProfile: handleEditProfile,
  onAddPlace: handleAddPlace,
  onCardClick: handleCardClick,
  cards,
  fetchData,
  errorMessage,
  onCardLike,
  onCardDelete
}) {
  return (
    <main className="main">
      {!errorMessage && (
        <Profile
          handleEditProfile={handleEditProfile}
          handleEditAvatar={handleEditAvatar}
          handleAddPlace={handleAddPlace}
        />
      )}
      {!errorMessage && (
        <section className="places" aria-label="Места">
          {cards.map(card => (
            <Card
              key={card._id}
              card={card}
              onImageClick={handleCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </section>
      )}
      {errorMessage && <PageError errorMessage={errorMessage} fetchData={fetchData} />}
    </main>
  );
}
