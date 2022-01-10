import ScheduleItem from "../../models/schedule";
import { currentDay } from "../../constants/days";
import {
  DEL_ACTIVITY,
  ADD_ACTIVITY,
  CHANGE_DAY,
  SET_SCHEDULES,
} from "../actions/dayActions";
import Colors from "../../constants/Colors";

const initialState = {
  selectedDay: currentDay,
  schedules: {
    Mon: [
      new ScheduleItem("s1", "Lunch", "2020-08-22T05:15:30.000Z", Colors.green),
      new ScheduleItem(
        "s2",
        "Dinnerdlfjg kfklfgjs;jfklg;j sklfjggldflgkkflfg sl;g;lkajladf  fsdkjflsj dfs fsjd lfsldfjs dfs",
        "2020-08-22T05:14:30.000Z",
        Colors.red
      ),
      new ScheduleItem(
        "s3",
        "Breakfast",
        "2020-07-22T05:16:30.000Z",
        Colors.green
      ),
      new ScheduleItem(
        "s4",
        "Supper",
        "2020-08-22T05:18:30.000Z",
        Colors.yellow
      ),
      new ScheduleItem("s5", "Snack", "2020-08-22T05:12:30.000Z", Colors.green),
    ],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SCHEDULES:
      console.log(action.schedules);
      return state;
    // return {
    //   places: action.places.map(
    //     (pl) => new Place(pl.id.toString(), pl.title, pl.imageUri)
    //   ),
    // };
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
