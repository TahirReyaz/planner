import React from "react";
import { enableScreens } from "react-native-screens";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";

import AppNavigator from "./navigation/AppNavigator";
import dayReducer from "./store/reducers/dayReducer";
import monthReducer from "./store/reducers/monthReducer";

enableScreens();

const rootReducer = combineReducers({
  schedule: dayReducer,
  monthPlan: monthReducer
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
