export function isOverlayClick(mouseDownEvent) {
  if (
    mouseDownEvent.button === 0
    && mouseDownEvent.currentTarget === mouseDownEvent.target
    ) {
    return true;
  } else {
    return false;
  }
}

export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}
