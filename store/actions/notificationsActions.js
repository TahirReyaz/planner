export const SET_NOTIFICATIONS = "SET_NOTIFICATION";

export const setNotifications = (day, notifications) => {
  return {
    type: SET_NOTIFICATIONS,
    day,
    notifications,
  };
};
