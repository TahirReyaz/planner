export const CLEAR_YEAR_PLAN = "CLEAR_YEAR_PLAN";
export const ADD_YEAR_PLAN_ITEM = "ADD_YEAR_PLAN_ITEM";
export const CHECK_YEAR_PLAN_ITEM = "CHECK_YEAR_PLAN_ITEM";
export const DEL_YEAR_PLAN_ITEM = "DEL_YEAR_PLAN_ITEM";
import { currentYear } from "../../constants/years";

export const checkPlanItem = (id, index) => {
  const year = currentYear + index;
  return { type: CHECK_YEAR_PLAN_ITEM, id, index, year: year.toString() };
};

export const clearPlan = (index) => {
  const year = currentYear + index;
  return { type: CLEAR_YEAR_PLAN, index, year: year.toString() };
};

export const delPlanItem = (id, index) => {
  const year = currentYear + index;
  return { type: DEL_YEAR_PLAN_ITEM, id, year: year.toString() };
};

export const addPlanItem = (index, task) => {
  const year = currentYear + index;
  const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
  return {
    type: ADD_YEAR_PLAN_ITEM,
    index,
    id,
    task,
    year: year.toString(),
  };
};
