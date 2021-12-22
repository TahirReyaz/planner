import ScheduleItem from "../../models/schedule";
import { DEL_ACTIVITY, ADD_ACTIVITY } from "../actions/dayActions";

const initialState = {
  activities: [
    new ScheduleItem("s1", "Lunch", "2020-08-22T05:15:30.000Z", "green"),
    new ScheduleItem(
      "s2",
      "Dinnerdlfjg kfklfgjs;jfklg;j sklfjggldflgkkflfg sl;g;lkajladf  fsdkjflsj dfs fsjd lfsldfjs dfs",
      "2020-08-22T05:14:30.000Z",
      "red"
    ),
    new ScheduleItem("s3", "Breakfast", "2020-07-22T05:16:30.000Z", "green"),
    new ScheduleItem("s4", "Supper", "2020-08-22T05:18:30.000Z", "yellow"),
    new ScheduleItem("s5", "Snack", "2020-08-22T05:12:30.000Z", "green"),
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DEL_ACTIVITY:
      return {
        activities: state.activities.filter(
          (activity) => activity.id !== action.actId
        ),
      };
    case ADD_ACTIVITY:
      const newActivity = new ScheduleItem(
        action.id,
        action.activity,
        action.time,
        action.color
      );
      return {
        activities: state.activities.concat(newActivity),
      };
  }
  return state;
};