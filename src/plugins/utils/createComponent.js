import { h, render } from 'vue';

export function createComponent(component) {
  const container = document.createElement('div');
  const vnode = h(component);
  render(vnode, container);
  document.body.appendChild(container.firstChild);
  return vnode;
}
