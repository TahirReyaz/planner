import ScheduleItem from "../../models/schedule";
import { DEL_ACTIVITY, ADD_ACTIVITY, CHANGE_DAY } from "../actions/dayActions";

const initialState = {
  selectedDay: "Everyday",
  schedules: {},
};

export default (state = initialState, action) => {
  let newSchedule;
  switch (action.type) {
    case DEL_ACTIVITY:
      newSchedule = state.schedules[state.selectedDay].filter(
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
      const selectedDay = action.selectedDay;
      const newActivity = new ScheduleItem(
        action.id,
        action.activity,
        action.time,
        action.color
      );
      newSchedule = [...state.schedules[selectedDay], newActivity];
      // console.log("New", newSchedule);
      const sortedSchedule = newSchedule.sort((activityA, activityB) => {
        // console.log(activityB.activity, activityA.activity);
        if (activityA.time < activityB.time) {
          return -1;
        } else if (activityA.time > activityB.time) {
          return 1;
        }
        return 0;
      });
      // console.log("Sorted", sortedSchedule);

      return {
        ...state,
        schedules: {
          ...state.schedules,
          [selectedDay]: sortedSchedule,
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
