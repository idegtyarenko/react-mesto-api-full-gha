import { React, useState, useCallback, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { api } from '../utils/api.js';
import { login, logout, register } from '../utils/auth.js';
import { isEmptyObject } from '../utils/utils.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

import ProtectedRouteElement from './ProtectedRoute.js';
import Header from './Header';
import Main from './Main';
import Register from './Register';
import Login from './Login';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup.js';
import InfoTooltip from './InfoTooltip'

import illustration_success from '../images/illustr_success.svg';
import illustration_error from '../images/illustr_error.svg';


function App() {

  const [isGetProfileAttempted, setGetProfileAttempted] = useState(false);
  const [infoTooltipState, setInfoTooltipState] = useState({});
  const [authAwaitingResponse, setAuthAwaitingResponse] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [editProfilePopupState, setEditProfilePopupState] = useState({
    name: 'edit-profile',
    isOpen: false,
    isAwaitingResponse: false,
    errorMessage: ''
  });
  const [editAvatarPopupState, setEditAvatarPopupState] = useState({
    name: 'edit-avatar',
    isOpen: false,
    isAwaitingResponse: false,
    errorMessage: ''
  });

  const [cards, setCards] = useState([]);
  const [imagePopupState, setimagePopupState] = useState({});
  const [cardToDelete, setCardToDelete] = useState({});
  const [addPlacePopupState, setAddPlacePopupState] = useState({
    name: 'add-place',
    isOpen: false,
    isAwaitingResponse: false,
    errorMessage: ''
  });
  const [deletePlacePopupState, setDeletePlacePopupState] = useState({
    name: 'delete-place',
    isOpen: false,
    isAwaitingResponse: false,
    errorMessage: ''
  });

  const [pageErrorMessage, setPageErrorMessage] = useState('');

  const navigate = useNavigate();


  // Управление попапами

  const closeAllPopups = useCallback(() => {
    setEditProfilePopupState({ ...editProfilePopupState, isOpen: false });
    setAddPlacePopupState({ ...addPlacePopupState, isOpen: false });
    setEditAvatarPopupState({ ...editAvatarPopupState, isOpen: false });
    setDeletePlacePopupState({ ...deletePlacePopupState, isOpen: false });
    setimagePopupState({ ...imagePopupState, isOpen: false });
    setInfoTooltipState({ ...infoTooltipState, isOpen: false });
  }, [editProfilePopupState, addPlacePopupState, editAvatarPopupState,
      deletePlacePopupState, imagePopupState, infoTooltipState]);

  function handleEditProfileClick() {
    setEditProfilePopupState({ ...editProfilePopupState, errorMessage: '', isOpen: true });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupState({ ...editAvatarPopupState, errorMessage: '', isOpen: true });
  }

  function handleAddPlaceClick() {
    setAddPlacePopupState({ ...addPlacePopupState, errorMessage: '', isOpen: true });
  }

  function handleCardClick(card) {
    setimagePopupState({ isOpen: true, card: card });
  }

  function handleCardDeleteClick(card) {
    setCardToDelete(card);
    setDeletePlacePopupState({ ...deletePlacePopupState, errorMessage: '', isOpen: true });
  }

  function handleFormSubmit({
    stateGetter,
    stateSetter,
    apiMethod,
    apiArguments,
    formAction
  }) {
    stateSetter({ ...stateGetter, errorMessage: '', isAwaitingResponse: true });
    apiMethod(...apiArguments)
    .then(res => {
      formAction(res);
      stateSetter({ ...stateGetter, isAwaitingResponse: false });
      closeAllPopups();
    })
    .catch(err => {
      stateSetter({ ...stateGetter, errorMessage: err.message, isAwaitingResponse: false });
    });
  }


  // Проверка авторизованности и получение профиля

  function getProfile () {
    if (isGetProfileAttempted) {
      return;
    }
    api.getProfileData()
      .then(res => {
        setCurrentUser(res);
        navigate('/', {replace: true});
      })
      .catch((err) => {});
    setGetProfileAttempted(true);
  }

  useEffect(getProfile, [isGetProfileAttempted, navigate]);


  // Функции работы с авторизацией

  function handleAuthFormSubmit ({
    apiCaller,
    apiCallerArgs,
    onSuccess,
    redirectPath
  }) {
    setAuthAwaitingResponse(true);
    apiCaller(...apiCallerArgs)
    .then(res => {
      setAuthAwaitingResponse(false);
      onSuccess(res);
      navigate(redirectPath, {replace: true});
    })
    .catch(err => {
      setAuthAwaitingResponse(false);
      setInfoTooltipState({
        isOpen: true,
        image: illustration_error,
        text: (<>Что-то пошло не так!<br />Попробуйте ещё раз.</>)
      });
      console.error(err);
    });
  }

  function handleLogin (email, password) {
    handleAuthFormSubmit({
      apiCaller: login,
      apiCallerArgs: arguments,
      onSuccess: res => {
        setGetProfileAttempted(false);
      },
      redirectPath: '/'
    });
  }

  function handleRegister (email, password) {
    handleAuthFormSubmit({
      apiCaller: register,
      apiCallerArgs: arguments,
      onSuccess: () => {
        setInfoTooltipState({
          isOpen: true,
          image: illustration_success,
          text: 'Вы успешно зарегистрировались!'
        });
      },
      redirectPath: '/sign-in'
    });
  }

  function handleSignout() {
    logout()
      .then(() => {
        setCurrentUser(undefined);
        navigate('/sign-in', {replace: true});
      })
      .catch((err) => {
        console.error(err.message);
      });
  }


  // Операции с профилем

  function handleUpdateUser(userInfo) {
    handleFormSubmit({
      stateGetter: editProfilePopupState,
      stateSetter: setEditProfilePopupState,
      apiMethod: api.updateProfileData.bind(api),
      apiArguments: [userInfo],
      formAction: setCurrentUser
    });
  }

  function handleUpdateAvatar(userInfo) {
    handleFormSubmit({
      stateGetter: editAvatarPopupState,
      stateSetter: setEditAvatarPopupState,
      apiMethod: api.updateAvatar.bind(api),
      apiArguments: [userInfo],
      formAction: setCurrentUser
    });
  }


  // Операции с карточками

  const fetchCards = useCallback(() => {
    if (!cards.length) {
      api.getCards()
      .then(cards => {
        setCards(cards.reverse());
      })
      .catch(err => {
        setPageErrorMessage(err.message);
      });
    }
  }, [ setPageErrorMessage, cards.length ]);

  function fetchData() {
    setPageErrorMessage('');
    fetchCards();
  }

  useEffect(() => {
    currentUser && !isEmptyObject(currentUser) && fetchCards();
  }, [ fetchCards, currentUser ]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(id => id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
    .then(newCard => {
      setCards(state => state.map(c => c._id === card._id ? newCard : c));
    })
    .catch(console.error);
  }

  function handleCardDelete(evt) {
    evt.preventDefault();
    handleFormSubmit({
      stateGetter: deletePlacePopupState,
      stateSetter: setDeletePlacePopupState,
      apiMethod: api.deleteCard.bind(api),
      apiArguments: [cardToDelete._id],
      formAction: () => {
        setCards(state => state.filter(c => c._id !== cardToDelete._id));
      }
    });
  }

  function handleAddPlaceSubmit(cardData) {
    handleFormSubmit({
      stateGetter: addPlacePopupState,
      stateSetter: setAddPlacePopupState,
      apiMethod: api.createCard.bind(api),
      apiArguments: [cardData],
      formAction: newCard => {
        setCards([newCard, ...cards]);
      }
    });
  }


  // Рендер

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header userEmail={currentUser ? currentUser.email : ''} handleSignout={handleSignout} />
      {isGetProfileAttempted && (
        <Routes>
          <Route path="/sign-up" element={
            <Register
            handleSubmit={handleRegister}
            isAwaitingResponse={authAwaitingResponse}
            />
          } />
          <Route path="/sign-in" element={
            <Login
              handleSubmit={handleLogin}
              isAwaitingResponse={authAwaitingResponse}
            />
          } />
          <Route path="/*" element={
            <>
              <ProtectedRouteElement
                element={Main}
                loggedIn={currentUser && !isEmptyObject(currentUser)}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                cards={cards}
                fetchData={fetchData}
                errorMessage={pageErrorMessage}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDeleteClick}
              />
              <Footer />
            </>
          } />
        </Routes>
      )}

      <EditProfilePopup
        state={editProfilePopupState}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        state={addPlacePopupState}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <EditAvatarPopup
        state={editAvatarPopupState}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <DeletePlacePopup
        state={deletePlacePopupState}
        onClose={closeAllPopups}
        onSubmit={handleCardDelete}
      />

      <ImagePopup state={imagePopupState} onClose={closeAllPopups} />

      <InfoTooltip state={infoTooltipState} onClose={closeAllPopups} />

    </CurrentUserContext.Provider>
  );
}

export default App;
