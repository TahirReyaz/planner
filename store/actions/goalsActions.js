export const ADD_GOAL = "ADD_GOAL";
export const DEL_GOAL = "DEL_GOAL";
export const INC_TOTAL = "INC_TOTAL";
export const DEC_TOTAL = "DEC_TOTAL";
export const INC_COMPLETED = "INC_COMPLETED";
export const DEC_COMPLETED = "DEC_COMPLETED";

export const addActivity = (goal, objName, total, completed, color) => {
  const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
  console.log(id, goal);
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

export const delActivity = (id) => {
  return { type: DEL_GOAL, id };
};
