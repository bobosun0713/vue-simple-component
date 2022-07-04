import { MessageCM, message } from './VMessage/index.js';
import { NotificationCM, notification } from './VNotification/index.js';
import { CollapseCM } from './VCollapse/index.js';
import { loading } from './VLoading/index.js';
import { ModalCM, modal } from './VModal/index.js';

const components = [MessageCM, NotificationCM, CollapseCM, ModalCM];

export default {
  install(app) {
    for (const cmp of components) {
      app.component(cmp.name, cmp);
    }

    app.provide('$message', message);
    app.provide('$notification', notification);
    app.provide('$loading', loading);
    app.provide('$modal', modal);
  }
};
