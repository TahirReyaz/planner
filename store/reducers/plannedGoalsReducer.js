import PlanItem from "../../models/plan-item";
import {
  ADD_GOAL,
  DEL_GOAL,
  ADD_TASK,
  CHECK_TASK,
  DEL_TASK,
} from "../actions/plannedGoalsActions";

const initialState = {
  goals: [],
};

export default (state = initialState, action) => {
  const newGoals = [...state.goals];

  switch (action.type) {
    case ADD_GOAL:
      const newGoal = {
        title: action.goal,
        color: action.color,
        tasks: [],
      };
      return {
        ...state,
        goals: state.goals ? state.goals.concat(newGoal) : [{ ...newGoal }],
      };
    case DEL_GOAL:
      newGoals.pop((goal) => goal.index === action.index);
      return {
        ...state,
        goals: newGoals,
      };
    case CHECK_TASK:
      const itemIndex = newGoals[action.index].tasks.findIndex(
        (task) => task.id === action.id
      );
      newGoals[action.index].tasks[itemIndex].checked =
        !newGoals[action.index].tasks[itemIndex].checked;
      return {
        ...state,
        goals: newGoals,
      };
    case DEL_TASK:
      newGoals[action.index].tasks = newGoals[action.index].tasks.filter(
        (task) => task.id !== action.id
      );
      return {
        ...state,
        goals: newGoals,
      };
    case ADD_TASK:
      const newPlanItem = new PlanItem(action.id, action.task, false);
      newGoals[action.index].tasks.push(newPlanItem);
      return {
        ...state,
        goals: newGoals,
      };
    default:
      return state;
  }
};
