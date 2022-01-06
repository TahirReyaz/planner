import YearPlanItem from "../../models/year-plan";
import years, { currentYear } from "../../constants/years";
import {
  ADD_PLAN_ITEM,
  CHANGE_YEAR,
  CHECK_PLAN_ITEM,
  CLEAR_PLAN,
  DEL_PLAN_ITEM,
} from "../actions/yearActions";

const initialState = {
  selectedYear: currentYear,
};
years.forEach((year) => {
  const monthsArray = [];
  for (let i = 0; i < 12; i++) {
    monthsArray.push([]);
  }
  initialState[year] = monthsArray;
});

initialState["2022"][0] = [
  new YearPlanItem("Jan1p1", "Complete the app", true),
  new YearPlanItem("Jan1p2", "Launch the app", false),
  new YearPlanItem("Jan1p3", "Meh", false),
  new YearPlanItem("Jan1p4", "Blah", false),
];
// initialState.Jan[1] = [
//   new MonthPlanItem("Jan2p1", "Learn to reduce size", true),
//   new MonthPlanItem("Jan2p2", "Reduce size of the app", false),
// ];

export default (state = initialState, action) => {
  // const newMonthPlan = [...state[state.selectedYear]];

  switch (action.type) {
    case CHANGE_YEAR:
      return {
        ...state,
        selectedYear: action.year,
      };
    // case CLEAR_PLAN:
    //   newMonthPlan[action.index] = [];
    //   return {
    //     ...state,
    //     [state.selectedYear]: newMonthPlan,
    //   };
    // case CHECK_PLAN_ITEM:
    //   const itemIndex = state[state.selectedYear][action.index].findIndex(
    //     (plan) => plan.id === action.id
    //   );
    //   newMonthPlan[action.index][itemIndex].checked =
    //     !newMonthPlan[action.index][itemIndex].checked;
    //   return {
    //     ...state,
    //     [state.selectedYear]: newMonthPlan,
    //   };
    // case DEL_PLAN_ITEM:
    //   newMonthPlan[action.index] = newMonthPlan[action.index].filter(
    //     (plan) => plan.id !== action.id
    //   );
    //   return {
    //     ...state,
    //     [state.selectedYear]: newMonthPlan,
    //   };
    // case ADD_PLAN_ITEM:
    //   const newPlanItem = new MonthPlanItem(action.id, action.task, false);
    //   newMonthPlan[action.index].push(newPlanItem);
    //   return {
    //     ...state,
    //     [state.selectedYear]: newMonthPlan,
    //   };
    default:
      return state;
  }
};
