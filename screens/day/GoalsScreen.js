import React from "react";
import { View, StyleSheet, Text, SafeAreaView, FlatList } from "react-native";
import GoalItem from "../../components/goals/GoalItem";
import Colors from "../../constants/Colors";

const GOALS = [
  {
    title: "React.js",
    obj: "Modules",
    total: 30,
    completed: 25,
    color: Colors.green,
  },
  {
    title: "React.js",
    obj: "Modules",
    total: 30,
    completed: 25,
    color: Colors.neonGreen,
  },
  {
    title: "React.js",
    obj: "Modules",
    total: 30,
    completed: 25,
    color: Colors.neonGreen,
  },
  {
    title: "React.js",
    obj: "Modules",
    total: 30,
    completed: 25,
    color: Colors.neonGreen,
  },
];

const GoalsScreen = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Goal completion Screen</Text>
      <Text>Clear Goals Screen</Text>
      <Text>Complete Goals Screen</Text>
      <FlatList
        data={GOALS}
        keyExtractor={(item, index) => index}
        renderItem={(itemData) => <GoalItem data={itemData.item} />}
      />
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
