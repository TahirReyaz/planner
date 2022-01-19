export const CHANGE_MONTH = "CHANGE_MONTH";
export const CLEAR_PLAN = "CLEAR_PLAN";
export const ADD_PLAN_ITEM = "ADD_PLAN_ITEM";
export const CHECK_PLAN_ITEM = "CHECK_PLAN_ITEM";
export const DEL_PLAN_ITEM = "DEL_PLAN_ITEM";

export const changeMonth = (month) => {
  return { type: CHANGE_MONTH, month };
};

export const checkPlanItem = (id, index) => {
  return { type: CHECK_PLAN_ITEM, id, index };
};

export const clearPlan = (index) => {
  return { type: CLEAR_PLAN, index };
};

export const delPlanItem = (id, index) => {
  return { type: DEL_PLAN_ITEM, index, id };
};

export const addPlanItem = (index, task) => {
  const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
  return { type: ADD_PLAN_ITEM, index, id, task };
};
