export const CHANGE_YEAR = "CHANGE_YEAR";
export const CLEAR_MONTH_PLAN = "CLEAR_MONTH_PLAN";
export const ADD_MONTH_PLAN_ITEM = "ADD_MONTH_PLAN_ITEM";
export const CHECK_MONTH_PLAN_ITEM = "CHECK_MONTH_PLAN_ITEM";
export const DEL_MONTH_PLAN_ITEM = "DEL_MONTH_PLAN_ITEM";

export const changeYear = (year) => {
  return { type: CHANGE_YEAR, year };
};

export const checkPlanItem = (id, index) => {
  return { type: CHECK_MONTH_PLAN_ITEM, id, index };
};

export const clearPlan = (index) => {
  return { type: CLEAR_MONTH_PLAN, index };
};

export const delPlanItem = (id, index) => {
  return { type: DEL_MONTH_PLAN_ITEM, index, id };
};

export const addPlanItem = (index, task) => {
  const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
  return { type: ADD_MONTH_PLAN_ITEM, index, id, task };
};
