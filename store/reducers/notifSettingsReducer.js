import { NOTIF_SETTINGS_UPDATE } from "../actions/notifSettingsActions";

const initialState = [
  { label: "Every Day", name: "Everyday", value: false },
  { label: "Weekdays", name: "Weekdays", value: false },
  { label: "WeekEnds", name: "WeekEnds", value: false },
  { label: "Monday", name: "Mon", value: false },
  { label: "Tuesday", name: "Tue", value: false },
  { label: "Wednesday", name: "Wed", value: false },
  { label: "Thursday", name: "Thu", value: false },
  { label: "Friday", name: "Fri", value: false },
  { label: "Saturday", name: "Sat", value: false },
  { label: "Sunday", name: "Sun", value: false },
];

export default (state = initialState, action) => {
  if (action.type === NOTIF_SETTINGS_UPDATE) {
    const updatedState = [...state];

    // react to weekday and everyday switches
    if (
      action.name === "Weekdays" &&
      updatedState[1].value === false &&
      updatedState[0].value === true
    ) {
      updatedState[0].value = false;
    } else if (
      action.name === "WeekEnds" &&
      updatedState[2].value === false &&
      updatedState[0].value === true
    ) {
      updatedState[0].value = false;
    } else if (
      action.name === "Everyday" &&
      updatedState[0].value === false &&
      updatedState[1].value === true
    ) {
      updatedState[1].value = false;
      updatedState[2].value = false;
    }

    // react to all switches
    const changedDayIndex = updatedState.findIndex(
      (day) => day.name === action.name
    );
    updatedState[changedDayIndex].value = !updatedState[changedDayIndex].value;

    return [...updatedState];
  }
  return state;
};
