export const ADD_GOAL = "ADD_GOAL";
export const DEL_GOAL = "DEL_GOAL";
export const ADD_TASK = "ADD_TASK";
export const CHECK_TASK = "CHECK_TASK";
export const DEL_TASK = "DEL_TASK";

export const addGoal = (goal) => {
  return { type: ADD_GOAL, goal };
};

export const checkTask = (id, index) => {
  return { type: CHECK_TASK, id, index };
};

export const delGoal = (index) => {
  return { type: DEL_GOAL, index };
};

export const delTask = (id, index) => {
  return { type: DEL_TASK, index, id };
};

export const addTask = (index, task) => {
  const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
  return { type: ADD_TASK, index, id, task };
};
