import React from "react";
import { View, StyleSheet, Text, SafeAreaView, FlatList } from "react-native";
import { useSelector } from "react-redux";

import GoalItem from "../../components/goals/GoalItem";
import NewGoalForm from "../../components/goals/NewGoalForm";
import Colors from "../../constants/Colors";

// const GOALS = [
//   {
//     id: "g1",
//     title: "React.js",
//     obj: "Modules",
//     total: 30,
//     completed: 25,
//     color: Colors.green,
//   },
//   {
//     id: "g2",
//     title: "React.js",
//     obj: "Modules",
//     total: 30,
//     completed: 25,
//     color: Colors.neonGreen,
//   },
//   {
//     id: "g3",
//     title: "React.js",
//     obj: "Modules",
//     total: 30,
//     completed: 25,
//     color: Colors.neonGreen,
//   },
//   {
//     id: "g4",
//     title: "React.js",
//     obj: "Modules",
//     total: 30,
//     completed: 25,
//     color: Colors.neonGreen,
//   },
// ];

const GoalsScreen = (props) => {
  const goals = useSelector((state) => state.goals.goals);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Goal completion Screen</Text>
      <Text>Clear Goals Screen</Text>
      <Text>Complete Goals Screen</Text>
      <NewGoalForm onAdd={() => {}} />
      {goals && goals.length > 0 ? (
        <FlatList
          data={goals}
          renderItem={(itemData) => (
            <GoalItem data={itemData.item} key={itemData.item.id} />
          )}
        />
      ) : (
        <Text>No goals. Set some!!</Text>
      )}
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
