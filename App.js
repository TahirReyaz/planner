import React from "react";
import { enableScreens } from "react-native-screens";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";

import AppNavigator from "./navigation/AppNavigator";
import dayReducer from "./store/reducers/dayReducer";
import monthReducer from "./store/reducers/monthReducer";
import yearReducer from "./store/reducers/yearReducer";
import lifeReducer from "./store/reducers/lifeReducer";
import { init } from "./helpers/db";

init()
  .then(() => {
    console.log("Initaited");
  })
  .catch((err) => console.log(err));

enableScreens();

const rootReducer = combineReducers({
  schedule: dayReducer,
  monthPlan: monthReducer,
  yearPlan: yearReducer,
  lifePlan: lifeReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
