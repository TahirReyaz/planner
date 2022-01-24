import React from "react";
import { Platform } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";

import ScheduleScreen, {
  screenOptions as schedScreenOptions,
} from "../screens/day/ScheduleScreen";
import NotificationSettingsScreen, {
  screenOptions as notificationSettingsScreenOptions,
} from "../screens/day/ToggleDaysScreen";
import GoalsScreen, {
  screenOptions as goalsScreenOptions,
} from "../screens/day/GoalsScreen";
import MonthPlanScreen, {
  screenOptions as monthPlanScreenOptions,
} from "../screens/MonthPlanScreen";
import YearScreen, {
  screenOptions as YearScreenOptions,
} from "../screens/YearScreen";
import LifeScreen, {
  screenOptions as LifeScreenOptions,
} from "../screens/LifeScreen";
import Colors from "../constants/Colors";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const defaultDrawerScreenOptions = {
  drawerActiveTintColor: Colors.secondary,
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const DayDrawerNavigator = createDrawerNavigator();

const DayDrawer = () => {
  return (
    <DayDrawerNavigator.Navigator screenOptions={defaultDrawerScreenOptions}>
      <DayDrawerNavigator.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={schedScreenOptions()}
      />
      <DayDrawerNavigator.Screen
        name="Schedule Settings"
        component={NotificationSettingsScreen}
        options={notificationSettingsScreenOptions()}
      />
      <DayDrawerNavigator.Screen
        name="Goals"
        component={GoalsScreen}
        options={goalsScreenOptions()}
      />
    </DayDrawerNavigator.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: Colors.lightGrey,
          tabBarStyle: { backgroundColor: Colors.primary },
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Day"
          component={DayDrawer}
          options={{
            tabBarIcon: (props) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-alarm" : "ios-alarm"}
                size={23}
                color={props.color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Month"
          component={MonthPlanScreen}
          options={{
            tabBarIcon: (props) => (
              <Ionicons
                name={
                  Platform.OS === "android" ? "md-calendar" : "ios-calendar"
                }
                size={23}
                color={props.color}
              />
            ),
            headerShown: true,
            ...monthPlanScreenOptions(),
            ...defaultNavigationOptions,
          }}
        />
        <Tab.Screen
          name="Year"
          component={YearScreen}
          options={{
            tabBarIcon: (props) => (
              <Ionicons
                name={
                  Platform.OS === "android"
                    ? "md-hourglass-outline"
                    : "ios-hourglass-outline"
                }
                size={23}
                color={props.color}
              />
            ),
            headerShown: true,
            ...YearScreenOptions(),
            ...defaultNavigationOptions,
          }}
        />
        <Tab.Screen
          name="Life"
          component={LifeScreen}
          options={{
            tabBarIcon: (props) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-wine" : "ios-wine"}
                size={23}
                color={props.color}
              />
            ),
            headerShown: true,
            ...LifeScreenOptions(),
            ...defaultNavigationOptions,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
