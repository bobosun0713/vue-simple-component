import { MessageCM, message } from './VMessage/index.js';

const components = [MessageCM];

export default {
  install(app) {
    for (const cmp of components) {
      app.component(cmp.name, cmp);
    }

    app.provide('$message', message);
  }
};
