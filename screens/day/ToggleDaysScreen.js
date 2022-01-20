import React from "react";
import { View, StyleSheet, Text, SafeAreaView, Button } from "react-native";

const ToggleDaysScreen = (props) => {
  return (
    <SafeAreaView>
      <Text>Schedule Settings</Text>
      <Button title="Refresh schedule notifications" />
    </SafeAreaView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Toggle Days",
  };
};

const styles = StyleSheet.create({});

export default ToggleDaysScreen;
