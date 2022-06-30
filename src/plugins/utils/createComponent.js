import { h, render } from 'vue';
export function createComponent(component, props = {}) {
  const container = document.createElement('div');
  const vNode = h(component, props);
  render(vNode, container);
  return { vNode, component: container.firstChild };
}
