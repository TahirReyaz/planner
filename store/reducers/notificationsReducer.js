import { SET_NOTIFICATIONS } from "../actions/notificationsActions";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      const selectedDay = action.day;
      return {
        ...state,
        [selectedDay]: action.notifications,
      };
    default:
      return state;
  }
};
