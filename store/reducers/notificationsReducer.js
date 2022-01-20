import { SET_NOTIFICATIONS } from "../actions/notificationsActions";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    // case DEL_ACTIVITY:
    //   const newSchedule = state.schedules[state.selectedDay].filter(
    //     (activity) => activity.id !== action.actId
    //   );
    //   return {
    //     ...state,
    //     schedules: {
    //       ...state.schedules,
    //       [state.selectedDay]: newSchedule,
    //     },
    //   };
    case SET_NOTIFICATIONS:
      const selectedDay = action.day;
      return {
        ...state,
        [selectedDay]: action.notifications,
      };
    // case CHANGE_DAY:
    //   return {
    //     ...state,
    //     selectedDay: action.selectedDay,
    //   };
    default:
      return state;
  }
};
