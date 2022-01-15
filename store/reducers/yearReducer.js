import PlanItem from "../../models/plan-item";
import years, { currentYear } from "../../constants/years";
import {
  ADD_MONTH_PLAN_ITEM,
  CHANGE_YEAR,
  CHECK_MONTH_PLAN_ITEM,
  CLEAR_MONTH_PLAN,
  DEL_MONTH_PLAN_ITEM,
} from "../actions/yearActions";

const initialState = {
  selectedYear: currentYear,
};
years.forEach((year) => {
  const monthsArray = [];
  for (let i = 0; i < 12; i++) {
    monthsArray.push([]);
  }
  initialState[year] = monthsArray;
});

export default (state = initialState, action) => {
  const newYearPlan = [...state[state.selectedYear]];
  let newMonthPlan;

  switch (action.type) {
    case CHANGE_YEAR:
      return {
        ...state,
        selectedYear: action.year,
      };
    case CLEAR_MONTH_PLAN:
      newYearPlan[action.index] = [];
      return {
        ...state,
        [state.selectedYear]: newYearPlan,
      };
    case CHECK_MONTH_PLAN_ITEM:
      const itemIndex = newYearPlan[action.index].findIndex(
        (plan) => plan.id === action.id
      );
      newMonthPlan = [...newYearPlan[action.index]];
      newMonthPlan[itemIndex].checked = !newMonthPlan[itemIndex].checked;
      newYearPlan[action.index] = newMonthPlan;
      return {
        ...state,
        [state.selectedYear]: newYearPlan,
      };
    case DEL_MONTH_PLAN_ITEM:
      newYearPlan[action.index] = newYearPlan[action.index].filter(
        (plan) => plan.id !== action.id
      );
      return {
        ...state,
        [state.selectedYear]: newYearPlan,
      };
    case ADD_MONTH_PLAN_ITEM:
      newMonthPlan = [...newYearPlan[action.index]];
      const newPlanItem = new PlanItem(action.id, action.task, false);
      newMonthPlan.push(newPlanItem);
      newYearPlan[action.index] = newMonthPlan;
      return {
        ...state,
        [state.selectedYear]: newYearPlan,
      };
    default:
      return state;
  }
};
