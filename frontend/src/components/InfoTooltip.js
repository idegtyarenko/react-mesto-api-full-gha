import { isEmptyObject } from "../utils/utils";

import Popup from "./Popup";

export default function InfoTooltip ({ state, onClose }) {
  return (
    !isEmptyObject(state) &&
    <Popup
      state={{ 'name': 'info-tooltip', isOpen: state.isOpen }}
      onClose={onClose}
    >
      <div className="popup__container popup__container_type_whitebox popup__container_padding_l">
        <button
          className="button popup__close-button popup__close"
          type="button"
          aria-label="Закрыть оповещение"
          onClick={onClose}
        />
        <img
          className="popup__tooltip-illustration"
          src={state.image}
          alt={`Иллюстрация к статусу: ${state.text}`}
        />
        <p className="popup__tooltip-text">{state.text}</p>
      </div>
    </Popup>
  );
}
