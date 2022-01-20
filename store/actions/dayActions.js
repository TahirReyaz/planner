export const DEL_ACTIVITY = "DEL_ACTIVITY";
export const ADD_ACTIVITY = "ADD_ACTIVITY";
export const CHANGE_DAY = "CHANGE_DAY";

export const addActivity = (selectedDay, activity, time, color) => {
  const id = Date.now().toString(36) + Math.random().toString(36).substr(2);

  return {
    type: ADD_ACTIVITY,
    id,
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
