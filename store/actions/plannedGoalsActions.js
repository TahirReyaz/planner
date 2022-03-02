export const ADD_PLANNED_GOAL = "ADD_PLANNED_GOAL";
export const DEL_PLANNED_GOAL = "DEL_PLANNED_GOAL";
export const ADD_PLANNED_GOAL_TASK = "ADD_PLANNED_GOAL_TASK";
export const CHECK_PLANNED_GOAL_TASK = "CHECK_PLANNED_GOAL_TASK";
export const DEL_PLANNED_GOAL_TASK = "DEL_PLANNED_GOAL_TASK";

export const addGoal = (goal, color) => {
  return { type: ADD_PLANNED_GOAL, goal, color };
};

export const checkTask = (id, index) => {
  return { type: CHECK_PLANNED_GOAL_TASK, id, index };
};

export const delGoal = (index) => {
  return { type: DEL_PLANNED_GOAL, index };
};

export const delTask = (id, index) => {
  return { type: DEL_PLANNED_GOAL_TASK, index, id };
};

export const addTask = (index, task) => {
  const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
  return { type: ADD_PLANNED_GOAL_TASK, index, id, task };
};
