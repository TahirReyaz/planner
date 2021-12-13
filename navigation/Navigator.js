import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
// import { useDispatch } from 'react-redux';

import ScheduleScreen, { screenOptions as schedScreenOptions } from '../screens/day/ScheduleScreen';
import SelectDayScreen, { screenOptions as selectDayScreenOptions } from '../screens/day/ScheduleScreen';
import Colors from '../constants/Colors';
// import AuthScreen, { screenOptions as authScreenOptions } from '../screens/user/AuthScreen';
// import * as authActions from '../store/actions/auth';

const defaultNavigationOptions= {
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
        name="SelectDayScreen" 
        component={SelectDayScreen} 
        options={selectDayScreenOptions}
      />
      {/* <DayStackNavigator.Screen 
        name="Cart" 
        component={CartScreen} 
        options={cartScreenOptions}
      /> */}
    </DayStackNavigator.Navigator>
  );
}

// const DayStackNavigator = createStackNavigator();

// export const DayNavigator = () => {
//   return (
//     <DayStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
//       <DayStackNavigator.Screen 
//         name="ScheduleScreen" 
//         component={ScheduleScreen} 
//         options={schedScreenOptions}
//       />
//       <DayStackNavigator.Screen 
//         name="SelectDayScreen" 
//         component={SelectDayScreen} 
//         options={selectDayScreenOptions}
//       />
//       <DayStackNavigator.Screen 
//         name="Cart" 
//         component={CartScreen} 
//         options={cartScreenOptions}
//       />
//     </DayStackNavigator.Navigator>
//   );
// }

// const AdminStackNavigator = createStackNavigator();

// const AdminNavigator = () => {
//   return (
//     <AdminStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
//       <AdminStackNavigator.Screen 
//         name="UserProductsScreen" 
//         component={UserProductsScreen} 
//         options={userProdScreenOptions}
//       />
//       <AdminStackNavigator.Screen 
//         name="EditScreen" 
//         component={EditProductsScreen} 
//         options={editProdScreenOptions}
//       />
//     </AdminStackNavigator.Navigator>
//   );
// }

// const OrdersStackNavigator = createStackNavigator();

// const OrdersNavigator = () => {
//   return (
//     <OrdersStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
//       <OrdersStackNavigator.Screen 
//         name="OrderStack" 
//         component={OrdersScreen} 
//         options={ordersScreenOptions}
//       />
//     </OrdersStackNavigator.Navigator>
//   );
// }

// const AuthStackNavigator = createStackNavigator();

// export const AuthNavigator = () => {
//   return(
//     <AuthStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
//       <AuthStackNavigator.Screen 
//         name="AuthNavigator" 
//         component={AuthScreen} 
//         options={authScreenOptions}
//       />
//     </AuthStackNavigator.Navigator>
//   );
// }

const DrawerNavigator = createDrawerNavigator();

export const Drawer = () => {
  return (
    <DrawerNavigator.Navigator
      screenOptions={{
        drawerActiveTintColor: Colors.secondary,
        headerShown: false
      }}
    >
      <DrawerNavigator.Screen 
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
      <DrawerNavigator.Screen 
        name="DaySelector" 
        component={SelectDayScreen} 
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
      {/* <DrawerNavigator.Screen 
        name="Admin" 
        component={AdminNavigator} 
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
              size={23}
              color={props.color}
            />
          )
        }}  
      />*/}
    </DrawerNavigator.Navigator>
  );
}