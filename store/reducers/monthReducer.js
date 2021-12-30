import { MonthPlanItem } from "../../models/month-plan";
import {
  ADD_PLAN_ITEM,
  CHANGE_MONTH,
  CHECK_PLAN_ITEM,
  CLEAR_PLAN,
  DEL_PLAN_ITEM,
} from "../actions/monthActions";

const months = [
  { mon: "Jan", days: 31 },
  { mon: "Feb", days: 28 },
  { mon: "Mar", days: 31 },
  { mon: "Apr", days: 30 },
  { mon: "May", days: 31 },
  { mon: "Jun", days: 30 },
  { mon: "Jul", days: 31 },
  { mon: "Aug", days: 31 },
  { mon: "Sep", days: 30 },
  { mon: "Oct", days: 31 },
  { mon: "Nov", days: 30 },
  { mon: "Dec", days: 31 },
];
const initialState = {
  selectedMonth: "Jan",
};

months.forEach((month) => {
  const days = [];
  for (let i = 0; i < month.days; i++) {
    days.push([]);
  }
  initialState[month.mon] = days;
});

initialState.Jan[0] = [
  new MonthPlanItem("Jan1p1", "Complete the app", true),
  new MonthPlanItem("Jan1p2", "Launch the app", false),
  new MonthPlanItem("Jan1p3", "Meh", false),
  new MonthPlanItem("Jan1p4", "Blah", false),
];
initialState.Jan[1] = [
  new MonthPlanItem("Jan2p1", "Learn to reduce size", true),
  new MonthPlanItem("Jan2p2", "Reduce size of the app", false),
];

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_MONTH:
      return {
        ...state,
        selectedMonth: action.month,
      };
    case CLEAR_PLAN:
      const newMonthPlan = state[state.selectedMonth];
      newMonthPlan[action.index] = [];
      Object.assign(state[state.selectedMonth], newMonthPlan);
      return state;
    case CHECK_PLAN_ITEM:
      const itemIndex = state[state.selectedMonth][action.index].findIndex(
        (plan) => plan.id === action.id
      );
      const monthPlan = state[state.selectedMonth];
      monthPlan[action.index][itemIndex].checked =
        !monthPlan[action.index][itemIndex].checked;
      Object.assign(state[state.selectedMonth], newMonthPlan);
      return state;
    case DEL_PLAN_ITEM:
      return state;
    case ADD_PLAN_ITEM:
      return state;
    default:
      return state;
  }
};
