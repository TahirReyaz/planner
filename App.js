import React from "react";
import { enableScreens } from "react-native-screens";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AppNavigator from "./navigation/AppNavigator";
import dayReducer from "./store/reducers/dayReducer";
import monthReducer from "./store/reducers/monthReducer";
import yearReducer from "./store/reducers/yearReducer";
import lifeReducer from "./store/reducers/lifeReducer";
import goalsReducer from "./store/reducers/goalsReducer";
import notificationsReducer from "./store/reducers/notificationsReducer";
import { PersistGate } from "redux-persist/integration/react";

enableScreens();

const rootReducer = combineReducers({
  schedule: dayReducer,
  monthPlan: monthReducer,
  yearPlan: yearReducer,
  lifePlan: lifeReducer,
  goals: goalsReducer,
  notifications: notificationsReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
let persistor = persistStore(store);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
}
