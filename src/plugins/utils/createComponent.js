import { h, render } from 'vue';

export function createComponent(component, props = {}) {
  const container = document.createElement('div');
  const vnode = h(component, props);
  render(vnode, container);
  return { vNode, component: container.firstChild };
}
