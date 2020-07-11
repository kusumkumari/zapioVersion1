
/* eslint-disable */
import { NotificationManager } from "../../components/common/react-notifications";

export const Notification = (notificationType, message, moduleType) => {
  if (notificationType == 0) {
    NotificationManager.error(
      message,
      moduleType,
      3000,
      null,
      null,
      ''
    );
  }
  if (notificationType == 1) {
    NotificationManager.success(
      message,
      moduleType,
      3000,
      null,
      null,
      ''
    );
  }
}