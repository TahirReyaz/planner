import PlanItem from "../../models/plan-item";
import {
  ADD_PLANNED_GOAL,
  DEL_PLANNED_GOAL,
  ADD_PLANNED_GOAL_TASK,
  CHECK_PLANNED_GOAL_TASK,
  DEL_PLANNED_GOAL_TASK,
} from "../actions/plannedGoalsActions";

const initialState = {
  goals: [],
};

export default (state = initialState, action) => {
  const newGoals = [...state.goals];

  switch (action.type) {
    case ADD_PLANNED_GOAL:
      const newGoal = {
        title: action.goal,
        color: action.color,
        tasks: [],
      };
      return {
        ...state,
        goals: state.goals ? state.goals.concat(newGoal) : [{ ...newGoal }],
      };
    case DEL_PLANNED_GOAL:
      newGoals.pop((goal) => goal.index === action.index);
      return {
        ...state,
        goals: newGoals,
      };
    case CHECK_PLANNED_GOAL_TASK:
      const itemIndex = newGoals[action.index].tasks.findIndex(
        (task) => task.id === action.id
      );
      newGoals[action.index].tasks[itemIndex].checked =
        !newGoals[action.index].tasks[itemIndex].checked;
      return {
        ...state,
        goals: newGoals,
      };
    case DEL_PLANNED_GOAL_TASK:
      newGoals[action.index].tasks = newGoals[action.index].tasks.filter(
        (task) => task.id !== action.id
      );
      return {
        ...state,
        goals: newGoals,
      };
    case ADD_PLANNED_GOAL_TASK:
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
