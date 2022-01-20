// export const DEL_ACTIVITY = "DEL_ACTIVITY";
export const SET_NOTIFICATIONS = "SET_NOTIFICATION";
// export const CHANGE_DAY = "CHANGE_DAY";
// export const SET_DAY = "SET_DAY";

export const setNotifications = (day, notifications) => {
  return {
    type: SET_NOTIFICATIONS,
    day,
    notifications,
  };
};

// export const delActivity = (id) => {
//   return { type: DEL_ACTIVITY, actId: id };
// };

// export const changeDay = (selectedDay) => {
//   return { type: CHANGE_DAY, selectedDay };
// };
