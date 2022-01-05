export const CHANGE_YEAR = "CHANGE_YEAR";
export const CLEAR_PLAN = "CLEAR_PLAN";
export const ADD_PLAN_ITEM = "ADD_PLAN_ITEM";
export const CHECK_PLAN_ITEM = "CHECK_PLAN_ITEM";
export const DEL_PLAN_ITEM = "DEL_PLAN_ITEM";

export const changeYear = (year) => {
  return async (dispatch) => {
    dispatch({ type: CHANGE_YEAR, year });
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

export const delPlanItem = (id, index) => {
  return async (dispatch) => {
    dispatch({ type: DEL_PLAN_ITEM, index, id });
  };
};

export const addPlanItem = (index, task) => {
  const id = Math.random().toString();
  return async (dispatch) => {
    dispatch({ type: ADD_PLAN_ITEM, index, id, task });
  };
};
