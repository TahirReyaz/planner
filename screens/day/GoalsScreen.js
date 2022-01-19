import React from "react";
import { View, StyleSheet, Text, SafeAreaView, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import GoalItem from "../../components/goals/GoalItem";
import NewGoalForm from "../../components/goals/NewGoalForm";
import * as goalActions from "../../store/actions/goalsActions";

const GoalsScreen = (props) => {
  const goals = useSelector((state) => state.goals.goals);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Goal completion Screen</Text>
      <Text>Clear Goals Screen</Text>
      <Text>Complete Goals Screen</Text>
      <NewGoalForm
        onAdd={(goal, objName, total, completed, color) =>
          dispatch(goalActions.addGoal(goal, objName, total, completed, color))
        }
      />
      {goals && goals.length > 0 ? (
        <FlatList
          data={goals}
          renderItem={(itemData) => (
            <GoalItem
              data={itemData.item}
              key={itemData.item.id}
              onDel={() => dispatch(goalActions.delGoal(itemData.item.id))}
              onDecTotal={() =>
                dispatch(
                  goalActions.updateProgress(itemData.item.id, "total", "dec")
                )
              }
              onIncTotal={() =>
                dispatch(
                  goalActions.updateProgress(itemData.item.id, "total", "inc")
                )
              }
              onDecCompleted={() =>
                dispatch(
                  goalActions.updateProgress(
                    itemData.item.id,
                    "completed",
                    "dec"
                  )
                )
              }
              onIncCompleted={() =>
                dispatch(
                  goalActions.updateProgress(
                    itemData.item.id,
                    "completed",
                    "inc"
                  )
                )
              }
            />
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
