export const CHANGE_MONTH = "CHANGE_MONTH";
export const CLEAR_PLAN = "CLEAR_PLAN";
export const ADD_PLAN_ITEM = "ADD_PLAN_ITEM";
export const CHECK_PLAN_ITEM = "CHECK_PLAN_ITEM";
export const DEL_PLAN_ITEM = "DEL_PLAN_ITEM";

export const changeMonth = (month) => {
  return async (dispatch) => {
    dispatch({ type: CHANGE_MONTH, month });
  };
};

export const checkPlanItem = (id, index) => {
  return async (dispatch) => {
    dispatch({ type: CHECK_PLAN_ITEM, id, index });
  };
};

export const clearPlan = (index) => {
  return async (dispatch) => {
    dispatch({ type: CLEAR_PLAN, index });
  };
};
