import ScheduleItem from "../../models/schedule";
import { currentDay } from "../../constants/days";
import { DEL_ACTIVITY, ADD_ACTIVITY, CHANGE_DAY } from "../actions/dayActions";

const initialState = {
  selectedDay: currentDay,
  schedules: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DEL_ACTIVITY:
      const newSchedule = state.schedules[state.selectedDay].filter(
        (activity) => activity.id !== action.actId
      );
      return {
        ...state,
        schedules: {
          ...state.schedules,
          [state.selectedDay]: newSchedule,
        },
      };
    case ADD_ACTIVITY:
      const newActivity = new ScheduleItem(
        action.id,
        action.activity,
        action.time,
        action.color
      );
      const selectedDay = action.selectedDay;
      return {
        ...state,
        schedules: {
          ...state.schedules,
          [selectedDay]: state.schedules[selectedDay]
            ? state.schedules[selectedDay].concat(newActivity)
            : [newActivity],
        },
      };
    case CHANGE_DAY:
      return {
        ...state,
        selectedDay: action.selectedDay,
      };
    default:
      return state;
  }
};
