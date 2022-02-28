import React from "react";
import { Platform } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import ScheduleScreen, {
  screenOptions as schedScreenOptions,
} from "../screens/day/ScheduleScreen";
import NotificationSettingsScreen, {
  screenOptions as notificationSettingsScreenOptions,
} from "../screens/day/NotificationSettingsScreen";
import GoalsScreen, {
  screenOptions as goalsScreenOptions,
} from "../screens/day/GoalsScreen";
import MonthPlanScreen, {
  screenOptions as monthPlanScreenOptions,
} from "../screens/MonthPlanScreen";
import YearScreen, {
  screenOptions as yearScreenOptions,
} from "../screens/YearScreen";
import LifeScreen, {
  screenOptions as lifeScreenOptions,
} from "../screens/LifeScreen";
import Colors from "../constants/Colors";
import AboutScreen, {
  screenOptions as aboutScreenOptions,
} from "../screens/AboutScreen";
import PlannedGoalsScreen from "../screens/day/PlannedGoalsScreen";

const defaultNavigationOptions = {
  headerShown: false,
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
  headerTitleStyle: {
    fontFamily: "montserrat-bold",
  },
};

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
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
        component={ScheduleScreen}
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
              name={Platform.OS === "android" ? "md-calendar" : "ios-calendar"}
              size={23}
              color={props.color}
            />
          ),
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
        }}
      />
    </Tab.Navigator>
  );
};

const GoalsTab = createBottomTabNavigator();

const GoalsTabNavigator = () => {
  return (
    <GoalsTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: Colors.lightGrey,
        tabBarStyle: { backgroundColor: Colors.primary },
        headerShown: false,
      }}
    >
      <GoalsTab.Screen
        name="Progressive Goals"
        component={GoalsScreen}
        options={{
          tabBarIcon: (props) => (
            <Ionicons
              name={
                Platform.OS === "android"
                  ? "md-checkmark-done-circle"
                  : "ios-checkmark-done-circle"
              }
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <GoalsTab.Screen
        name="Planned Goals"
        component={PlannedGoalsScreen}
        options={{
          tabBarIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </GoalsTab.Navigator>
  );
};

const DayDrawerNavigator = createDrawerNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <DayDrawerNavigator.Navigator screenOptions={defaultDrawerScreenOptions}>
        <DayDrawerNavigator.Screen
          name="Planner"
          component={TabNavigator}
          options={{
            headerTitle: "PLANNER",
            drawerIcon: (props) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-list" : "ios-list"}
                size={23}
                color={props.color}
              />
            ),
          }}
        />
        <DayDrawerNavigator.Screen
          name="Notification Settings"
          component={NotificationSettingsScreen}
          options={notificationSettingsScreenOptions()}
        />
        <DayDrawerNavigator.Screen
          name="Goals"
          component={GoalsTabNavigator}
          options={{
            headerTitle: "GOALS",
            drawerIcon: (props) => (
              <Ionicons
                name={
                  Platform.OS === "android"
                    ? "md-checkmark-circle"
                    : "ios-checkmark-circle"
                }
                size={23}
                color={props.color}
              />
            ),
          }}
        />
        <DayDrawerNavigator.Screen
          name="About"
          component={AboutScreen}
          options={aboutScreenOptions()}
        />
      </DayDrawerNavigator.Navigator>
      <StatusBar style="dark" />
    </NavigationContainer>
  );
};

export default MainNavigator;
