import React from "react";
import { Platform } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import ScheduleScreen, {
  screenOptions as schedScreenOptions,
} from "../screens/day/ScheduleScreen";
import ToggleDaysScreen, {
  screenOptions as toggleDaysScreenOptions,
} from "../screens/day/ToggleDaysScreen";
import MonthPlanScreen, {
  screenOptions as monthPlanScreenOptions,
} from "../screens/month/MonthPlanScreen";
import YearScreen, {
  screenOptions as YearScreenOptions,
} from "../screens/YearScreen";
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
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <DayDrawerNavigator.Screen
        name="Toggle Days"
        component={ToggleDaysScreen}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </DayDrawerNavigator.Navigator>
  );
};

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
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
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
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
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
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
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={props.color}
            />
          ),
          headerShown: true,
          ...YearScreenOptions(),
          ...defaultNavigationOptions,
        }}
      />
    </Tab.Navigator>
  );
};
