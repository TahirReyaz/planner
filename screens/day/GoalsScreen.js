import React from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";

const GoalsScreen = (props) => {
  return (
    <SafeAreaView>
      <Text>Goal completion Screen</Text>
      <Text>Clear Goals Screen</Text>
      <Text>Complete Goals Screen</Text>
    </SafeAreaView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Goals",
  };
};

const styles = StyleSheet.create({});

export default GoalsScreen;
