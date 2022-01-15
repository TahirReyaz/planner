import PlanItem from "../../models/plan-item";
import { monthDays as months, currentMonth } from "../../constants/months";
import {
  ADD_PLAN_ITEM,
  CHANGE_MONTH,
  CHECK_PLAN_ITEM,
  CLEAR_PLAN,
  DEL_PLAN_ITEM,
} from "../actions/monthActions";

const initialState = {
  selectedMonth: months[currentMonth].mon,
};

months.forEach((month) => {
  const days = [];
  for (let i = 0; i < month.days; i++) {
    days.push([]);
  }
  initialState[month.mon] = days;
});

export default (state = initialState, action) => {
  const newMonthPlan = [...state[state.selectedMonth]];

  switch (action.type) {
    case CHANGE_MONTH:
      return {
        ...state,
        selectedMonth: action.month,
      };
    case CLEAR_PLAN:
      newMonthPlan[action.index] = [];
      return {
        ...state,
        [state.selectedMonth]: newMonthPlan,
      };
    case CHECK_PLAN_ITEM:
      const itemIndex = newMonthPlan[action.index].findIndex(
        (plan) => plan.id === action.id
      );
      newMonthPlan[action.index][itemIndex].checked =
        !newMonthPlan[action.index][itemIndex].checked;
      return {
        ...state,
        [state.selectedMonth]: newMonthPlan,
      };
    case DEL_PLAN_ITEM:
      newMonthPlan[action.index] = newMonthPlan[action.index].filter(
        (plan) => plan.id !== action.id
      );
      return {
        ...state,
        [state.selectedMonth]: newMonthPlan,
      };
    case ADD_PLAN_ITEM:
      const newPlanItem = new PlanItem(action.id, action.task, false);
      newMonthPlan[action.index].push(newPlanItem);
      return {
        ...state,
        [state.selectedMonth]: newMonthPlan,
      };
    default:
      return state;
  }
};
