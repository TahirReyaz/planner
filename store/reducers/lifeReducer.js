import PlanItem from "../../models/plan-item";
import { lifeYears as years } from "../../constants/years";
import {
  ADD_MONTH_PLAN_ITEM,
  CHECK_MONTH_PLAN_ITEM,
  CLEAR_MONTH_PLAN,
  DEL_MONTH_PLAN_ITEM,
} from "../actions/yearActions";

const initialState = {};
years.forEach((year) => {
  initialState[year] = [];
});

initialState["2022"] = [
  new PlanItem("2022p1", "Complete the app", true),
  new PlanItem("2022p2", "Launch the app", false),
  new PlanItem("2022p3", "Meh", false),
  new PlanItem("2022p4", "Blah", false),
];
initialState["2025"] = [
  new PlanItem("2023p1", "Complete the app", true),
  new PlanItem("2023p2", "Launch the app", false),
  new PlanItem("2023p3", "Meh", false),
  new PlanItem("2023p4", "Blah", false),
];

export default (state = initialState, action) => {
  // const newLifePlan = [...state[state.selectedYear]];

  switch (action.type) {
    // case CLEAR_MONTH_PLAN:
    //   newLifePlan[action.index] = [];
    //   return {
    //     ...state,
    //     [state.selectedYear]: newLifePlan,
    //   };
    // case CHECK_MONTH_PLAN_ITEM:
    //   const itemIndex = state[state.selectedYear][action.index].findIndex(
    //     (plan) => plan.id === action.id
    //   );
    //   newLifePlan[action.index][itemIndex].checked =
    //     !newLifePlan[action.index][itemIndex].checked;
    //   return {
    //     ...state,
    //     [state.selectedYear]: newLifePlan,
    //   };
    // case DEL_MONTH_PLAN_ITEM:
    //   newLifePlan[action.index] = newLifePlan[action.index].filter(
    //     (plan) => plan.id !== action.id
    //   );
    //   return {
    //     ...state,
    //     [state.selectedYear]: newLifePlan,
    //   };
    // case ADD_MONTH_PLAN_ITEM:
    //   console.log("iNside year reducer", action.task);
    //   const newPlanItem = new YearPlanItem(action.id, action.task, false);
    //   newLifePlan[action.index].push(newPlanItem);
    //   return {
    //     ...state,
    //     [state.selectedYear]: newLifePlan,
    //   };
    default:
      return state;
  }
};
