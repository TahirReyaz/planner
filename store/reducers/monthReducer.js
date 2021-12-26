import { MonthPlans, MonthPlanItem } from "../../models/month-plan";
import { ADD_PLAN_ITEM, CHANGE_MONTH } from "../actions/monthActions";

const initialState = {
  selectedMonth: "Jan",
  schedules: {
    Jan: [
      new MonthPlans("1", [
        new MonthPlanItem("p1", "Complete the app", true),
        new MonthPlanItem("p2", "Launch the app", false),
      ]),
      new MonthPlans("2", [
        new MonthPlanItem("j1", "Learn to reduce size", true),
        new MonthPlanItem("j2", "Reduce size of the app", false),
      ]),
    ],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_MONTH:
      console.log("inside reducer ", action.month);
      return {
        ...state,
        selectedMonth: action.month,
      };
      break;
    //   case DEL_ACTIVITY:
    //     const newSchedule = state.schedules[state.selectedDay].filter(
    //       (activity) => activity.id !== action.actId
    //     );
    //     return {
    //       ...state,
    //       schedules: {
    //         ...state.schedules,
    //         [state.selectedDay]: newSchedule,
    //       },
    //     };
    //   case ADD_ACTIVITY:
    //     const newActivity = new ScheduleItem(
    //       action.id,
    //       action.activity,
    //       action.time,
    //       action.color
    //     );
    //     const selectedDay = action.selectedDay;
    //     return {
    //       ...state,
    //       schedules: {
    //         ...state.schedules,
    //         [selectedDay]: state.schedules[selectedDay]
    //           ? state.schedules[selectedDay].concat(newActivity)
    //           : [newActivity],
    //       },
    //     };
    default:
      return state;
  }
};
