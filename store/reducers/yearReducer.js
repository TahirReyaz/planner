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

initialState["2022"][0] = [
  new PlanItem("2022p1", "Complete the app", true),
  new PlanItem("2022p2", "Launch the app", false),
  new PlanItem("2022p3", "Meh", false),
  new PlanItem("2022p4", "Blah", false),
];
initialState["2022"][7] = [
  new PlanItem("2023p1", "Complete the app", true),
  new PlanItem("2023p2", "Launch the app", false),
  new PlanItem("2023p3", "Meh", false),
  new PlanItem("2023p4", "Blah", false),
];

export default (state = initialState, action) => {
  const newYearPlan = [...state[state.selectedYear]];

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
      const itemIndex = state[state.selectedYear][action.index].findIndex(
        (plan) => plan.id === action.id
      );
      newYearPlan[action.index][itemIndex].checked =
        !newYearPlan[action.index][itemIndex].checked;
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
      console.log("iNside year reducer", action.task);
      const newPlanItem = new PlanItem(action.id, action.task, false);
      newYearPlan[action.index].push(newPlanItem);
      return {
        ...state,
        [state.selectedYear]: newYearPlan,
      };
    default:
      return state;
  }
};
