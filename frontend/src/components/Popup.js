import { React, useEffect } from 'react';
import { isOverlayClick } from '../utils/utils.js'

export default function Popup ({
  state,
  onClose,
  children
}) {

  const { name: popupName, isOpen } = state;

  useEffect(() => {
    function handleKeyPress(evt) {
      if('key' in evt && (evt.key === 'Escape')){
        onClose();
      }
    }
    if (state.isOpen) {
      document.addEventListener('keydown', handleKeyPress);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    }
  }, [ state, onClose ]);

  function handleOverlayMouseDown(evt) {
    if (isOverlayClick(evt)) {
      onClose();
    }
  }

  function makeRootContainerClass() {
    const classList=['popup', 'popup_type_' + popupName];
    if (isOpen) {
      classList.push('popup_opened');
    }
    return classList.join(' ');
  }

  return (
    <div className={makeRootContainerClass()} onMouseDown={handleOverlayMouseDown}>
      {children}
    </div>
  );
}
