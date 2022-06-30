export function addClass(el, className) {
  if (!el) return;
  let classes = (className || '').split(' ');
  for (const name of classes) {
    el.classList.add(name);
  }
}

export function removeClass(el, className) {
  if (!el) return;
  let classes = (className || '').split(' ');
  for (const name of classes) {
    el.classList.remove(name);
  }
}

export function setStyle(el, cssKey, cssValue) {
  if (!el) return;
  el.setAttribute(cssKey, cssValue);
}
