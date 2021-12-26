import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ScheduleScreen, { screenOptions as schedScreenOptions } from '../screens/day/ScheduleScreen';
import ToggleDaysScreen, { screenOptions as toggleDaysScreenOptions } from '../screens/day/ToggleDaysScreen';
import MonthPlanScreen, { screenOptions as monthPlanScreenOptions } from '../screens/month/MonthPlanScreen';
import SelectMonthScreen, { screenOptions as selectMonthScreenOptions } from '../screens/month/SelectMonthScreen';
import Colors from '../constants/Colors';
// import AuthScreen, { screenOptions as authScreenOptions } from '../screens/user/AuthScreen';
// import * as authActions from '../store/actions/auth';

const defaultNavigationOptions= {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const defaultDrawerScreenOptions= {
  drawerActiveTintColor: Colors.secondary,
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const DayStackNavigator = createStackNavigator();

export const DayNavigator = () => {
  return (
    <DayStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <DayStackNavigator.Screen 
        name="ScheduleScreen" 
        component={ScheduleScreen} 
        options={schedScreenOptions}
      />
      <DayStackNavigator.Screen 
        name="ToggleDaysScreen" 
        component={ToggleDaysScreen} 
        options={toggleDaysScreenOptions}
      />
    </DayStackNavigator.Navigator>
  );
}

const DayDrawerNavigator = createDrawerNavigator();

const DayDrawer = () => {
  return (
    <DayDrawerNavigator.Navigator
      screenOptions={defaultDrawerScreenOptions}
    >
      <DayDrawerNavigator.Screen 
        name="Schedule" 
        component={ScheduleScreen} 
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              color={props.color}
            />
          )
        }} 
      />
      <DayDrawerNavigator.Screen 
        name="Toggle Days" 
        component={ToggleDaysScreen} 
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
              color={props.color}
            />
          )
        }} 
      />
    </DayDrawerNavigator.Navigator>
  );
}

const MonthDrawerNavigator = createDrawerNavigator();

const MonthDrawer = () => {
  return (
    <MonthDrawerNavigator.Navigator
      screenOptions={defaultDrawerScreenOptions}
    >
      <MonthDrawerNavigator.Screen 
        name="Planner" 
        component={MonthPlanScreen} 
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              color={props.color}
            />
          )
        }} 
      />
      <MonthDrawerNavigator.Screen 
        name="Select Month" 
        component={SelectMonthScreen} 
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
              color={props.color}
            />
          )
        }} 
      />
    </MonthDrawerNavigator.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
  return(
    <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {backgroundColor: Colors.primary},
        headerShown: false
    }}>
      <Tab.Screen 
        name="Day" 
        component={DayDrawer} 
        options={{
          tabBarIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              color={props.color}
            />
          )
        }} 
      />
      <Tab.Screen 
        name="Month" 
        component={MonthDrawer} 
        options={{
          tabBarIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              color={props.color}
            />
          )
        }} 
      />
    </Tab.Navigator>
  );
}