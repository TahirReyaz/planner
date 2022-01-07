import PlanItem from "../../models/plan-item";
import { lifeYears as years } from "../../constants/years";
import {
  ADD_YEAR_PLAN_ITEM,
  CHECK_YEAR_PLAN_ITEM,
  CLEAR_YEAR_PLAN,
  DEL_YEAR_PLAN_ITEM,
} from "../actions/lifeActions";

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
  let newYearPlan = action.year ? [...state[action.year]] : [];

  switch (action.type) {
    case CLEAR_YEAR_PLAN:
      newYearPlan = [];
      return {
        ...state,
        [action.year]: newYearPlan,
      };
    case CHECK_YEAR_PLAN_ITEM:
      const itemIndex = newYearPlan.findIndex((plan) => plan.id === action.id);
      newYearPlan[itemIndex].checked = !newYearPlan[itemIndex].checked;
      return {
        ...state,
        [action.year]: newYearPlan,
      };
    case DEL_YEAR_PLAN_ITEM:
      newYearPlan = newYearPlan.filter((plan) => plan.id !== action.id);
      return {
        ...state,
        [action.year]: newYearPlan,
      };
    case ADD_YEAR_PLAN_ITEM:
      const newPlanItem = new PlanItem(action.id, action.task, false);
      newYearPlan.push(newPlanItem);
      return {
        ...state,
        [action.year]: newYearPlan,
      };
    default:
      return state;
  }
};
