import React from 'react';
import { enableScreens } from 'react-native-screens'

import AppNavigator from './navigation/AppNavigator';

enableScreens();

export default function App() {
  return (
    <AppNavigator />
  );
}
