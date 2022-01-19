export const ADD_GOAL = "ADD_GOAL";
export const DEL_GOAL = "DEL_GOAL";
export const UPDATE_PROGRESS = "UPDATE_PROGRESS";

export const addGoal = (goal, objName, total, completed, color) => {
  const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
  return {
    type: ADD_GOAL,
    id,
    goal,
    objName,
    total,
    completed,
    color,
  };
};

export const delGoal = (id) => {
  return { type: DEL_GOAL, id };
};

export const updateProgress = (id, valueType, change) => {
  return { type: UPDATE_PROGRESS, id, valueType, change };
};
