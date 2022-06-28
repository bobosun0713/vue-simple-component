import { MessageCM, message } from './VMessage/index.js';
import { NotificationCM, notification } from './VNotification/index.js';
import { CollapseCM } from './VCollapse/index.js';

const components = [MessageCM, NotificationCM, CollapseCM];

export default {
  install(app) {
    for (const cmp of components) {
      app.component(cmp.name, cmp);
    }

    app.provide('$message', message);
    app.provide('$notification', notification);
  }
};
