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
  const newMonthPlan = [...state.goals];
  let newGoal;

  switch (action.type) {
    case ADD_GOAL:
      newGoal = {
        title: action.goal,
        tasks: [],
      };
      return {
        ...state,
        goals: state.goals ? state.goals.concat(newGoal) : [{ ...newGoal }],
      };
    case DEL_GOAL:
      newMonthPlan[action.index] = [];
      return {
        ...state,
        [state.selectedMonth]: newMonthPlan,
      };
    case CHECK_TASK:
      const itemIndex = newMonthPlan[action.index].findIndex(
        (plan) => plan.id === action.id
      );
      newMonthPlan[action.index][itemIndex].checked =
        !newMonthPlan[action.index][itemIndex].checked;
      return {
        ...state,
        [state.selectedMonth]: newMonthPlan,
      };
    case DEL_TASK:
      newMonthPlan[action.index] = newMonthPlan[action.index].filter(
        (plan) => plan.id !== action.id
      );
      return {
        ...state,
        [state.selectedMonth]: newMonthPlan,
      };
    case ADD_TASK:
      const newPlanItem = new PlanItem(action.id, action.task, false);
      newMonthPlan[action.index].push(newPlanItem);
      return {
        ...state,
        [state.selectedMonth]: newMonthPlan,
      };
    default:
      return state;
  }
};
