import GoalItem from "../../models/goalItem";
import { ADD_GOAL } from "../actions/goalsActions";

const initialState = {
  goals: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    // case DEL_ACTIVITY:
    //   const newSchedule = state.schedules[state.selectedDay].filter(
    //     (activity) => activity.id !== action.actId
    //   );
    //   return {
    //     ...state,
    //     schedules: {
    //       ...state.schedules,
    //       [state.selectedDay]: newSchedule,
    //     },
    //   };
    case ADD_GOAL:
      const newGoal = new GoalItem(
        action.id,
        action.goal,
        action.objName,
        action.total,
        action.completed,
        action.color
      );
      return {
        goals: state.goals.concat(newGoal),
      };
    default:
      return state;
  }
};
