import React, { useState } from "react";
import { enableScreens } from "react-native-screens";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import MainNavigator from "./navigation/Navigator";
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

const fetchFonts = () => {
  return Font.loadAsync({
    montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
    "montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "montserrat-black": require("./assets/fonts/Montserrat-Black.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainNavigator />
      </PersistGate>
    </Provider>
  );
}
