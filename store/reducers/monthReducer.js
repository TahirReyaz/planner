import { MonthPlanItem } from "../../models/month-plan";
import {
  ADD_PLAN_ITEM,
  CHANGE_MONTH,
  CHECK_PLAN_ITEM,
  CLEAR_PLAN,
} from "../actions/monthActions";

const initialState = {
  selectedMonth: "Jan",
  plans: {
    Jan: [
      [
        new MonthPlanItem("Jan1p1", "Complete the app", true),
        new MonthPlanItem("Jan1p2", "Launch the app", false),
        new MonthPlanItem("Jan1p3", "Meh", false),
        new MonthPlanItem("Jan1p4", "Blah", false),
      ],
      [
        new MonthPlanItem("Jan2p1", "Learn to reduce size", true),
        new MonthPlanItem("Jan2p2", "Reduce size of the app", false),
      ],
      [],
    ],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_MONTH:
      return {
        ...state,
        selectedMonth: action.month,
      };
    case CLEAR_PLAN:
      const newMonthPlan = state.plans[state.selectedMonth];
      newMonthPlan[action.index] = [];
      return {
        ...state,
        plans: {
          ...state.plans,
          [state.selectedMonth]: newMonthPlan,
        },
      };
    case CHECK_PLAN_ITEM:
      const checkedPlanItem = state.plans[state.selectedMonth][
        action.index
      ].find((plan) => plan.id === action.id);
      console.log(checkedPlanItem);
      const newPlanItem = new MonthPlanItem(
        checkedPlanItem.id,
        checkedPlanItem.task,
        !checkedPlanItem.checked
      );
      console.log(newPlanItem);
      return {
        ...state,
        plans: {
          ...state.plans,
          // [state.selectedMonth]: [
          //   ...[state.selectedMonth]
          // ]
        },
      };
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
