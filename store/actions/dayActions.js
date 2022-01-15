export const DEL_ACTIVITY = "DEL_ACTIVITY";
export const ADD_ACTIVITY = "ADD_ACTIVITY";
export const CHANGE_DAY = "CHANGE_DAY";
export const SET_DAY = "SET_DAY";

export const addActivity = (selectedDay, activity, time, color) => {
  return {
    type: ADD_ACTIVITY,
    id: Math.random().toString(),
    activity,
    time,
    color,
    selectedDay,
  };
};

export const delActivity = (id) => {
  return { type: DEL_ACTIVITY, actId: id };
};

export const changeDay = (selectedDay) => {
  return { type: CHANGE_DAY, selectedDay };
};
