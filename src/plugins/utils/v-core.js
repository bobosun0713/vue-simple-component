import { getCurrentInstance } from 'vue';
export function instanceSetting() {
  const instance = getCurrentInstance();
  const destroyElement = currentInstance => {
    if (!currentInstance.proxy.isCommand) return;
    currentInstance.proxy.$el.parentNode.removeChild(currentInstance.proxy.$el);
  };
  return {
    instance,
    destroyElement
  };
}
