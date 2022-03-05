import GoalItem from "../../models/goalItem";
import {
  ADD_PROG_GOAL,
  DEL_PROG_GOAL,
  UPDATE_PROGRESS,
} from "../actions/goalsActions";

const initialState = {
  goals: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DEL_PROG_GOAL:
      const newGoals = state.goals.filter((goal) => goal.id !== action.id);
      return {
        goals: newGoals,
      };
    case ADD_PROG_GOAL:
      const newGoal = new GoalItem(
        action.id,
        action.goal,
        action.objName,
        +action.total,
        +action.completed,
        1,
        action.color
      );
      return {
        goals: state.goals.concat(newGoal),
      };
    case UPDATE_PROGRESS:
      const selectedGoalIndex = state.goals.findIndex(
        (goal) => goal.id === action.id
      );
      const selectedGoal = state.goals[selectedGoalIndex];
      if (action.valueType === "total") {
        if (action.change === "inc") {
          selectedGoal.total++;
        } else if (
          selectedGoal.total > 1 &&
          selectedGoal.total > selectedGoal.completed &&
          action.change === "dec"
        ) {
          selectedGoal.total--;
        }
      } else if (action.valueType === "completed") {
        if (
          action.change === "inc" &&
          selectedGoal.total >= selectedGoal.completed + selectedGoal.step
        ) {
          selectedGoal.completed += selectedGoal.step;
        } else if (
          selectedGoal.completed - selectedGoal.step >= 0 &&
          action.change === "dec"
        ) {
          selectedGoal.completed -= selectedGoal.step;
        }
      } else if (action.valueType === "step") {
        if (action.change === "inc" && selectedGoal.total > selectedGoal.step) {
          selectedGoal.step++;
        } else if (selectedGoal.step > 1 && action.change === "dec") {
          selectedGoal.step--;
        }
      }
      const updatedGoal = new GoalItem(
        selectedGoal.id,
        selectedGoal.goal,
        selectedGoal.objName,
        selectedGoal.total,
        selectedGoal.completed,
        selectedGoal.step,
        selectedGoal.color
      );
      const updatedGoals = [...state.goals];
      updatedGoals[selectedGoalIndex] = updatedGoal;
      return {
        goals: updatedGoals,
      };
    default:
      return state;
  }
};
