import { MonthPlanItem } from "../../models/month-plan";
import {
  ADD_PLAN_ITEM,
  CHANGE_MONTH,
  CHECK_PLAN_ITEM,
  CLEAR_PLAN,
  DEL_PLAN_ITEM,
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
      const itemIndex = state.plans[state.selectedMonth][
        action.index
      ].findIndex((plan) => plan.id === action.id);
      const monthPlan = state.plans[state.selectedMonth];
      monthPlan[action.index][itemIndex].checked =
        !monthPlan[action.index][itemIndex].checked;
      return {
        ...state,
        plans: {
          ...state.plans,
          [state.selectedMonth]: monthPlan,
        },
      };
    case DEL_PLAN_ITEM:
      return state;
    default:
      return state;
  }
};
