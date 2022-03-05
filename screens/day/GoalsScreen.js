import React, { useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

import GoalItem from "../../components/goals/GoalItem";
import NewGoalForm from "../../components/goals/NewGoalForm";
import * as goalActions from "../../store/actions/goalsActions";
import defaultStyles from "../../constants/default-styles";
import Colors from "../../constants/Colors";
import MyButton from "../../components/UI/MyButton";

const GoalsScreen = (props) => {
  const [showForm, setShowForm] = useState(false);
  const goals = useSelector((state) => state.goals.goals);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={defaultStyles.topMenu}>
        <View></View>
        <View>
          <MyButton
            title={!showForm ? "ADD GOAL" : "CLOSE FORM"}
            color={Colors.primary}
            onPress={() => setShowForm((prevState) => !prevState)}
            icon={
              <Ionicons
                name={showForm ? "md-chevron-up" : "md-chevron-down"}
                size={25}
                color="white"
                style={{ marginLeft: 5, marginRight: -5 }}
              />
            }
          />
        </View>
      </View>
      {showForm && (
        <NewGoalForm
          onAdd={(goal, objName, total, completed, color) =>
            dispatch(
              goalActions.addGoal(goal, objName, total, completed, color)
            )
          }
        />
      )}

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
              onDecStep={() =>
                dispatch(
                  goalActions.updateProgress(itemData.item.id, "step", "dec")
                )
              }
              onIncStep={() =>
                dispatch(
                  goalActions.updateProgress(itemData.item.id, "step", "inc")
                )
              }
            />
          )}
        />
      ) : (
        <View style={styles.fallback}>
          <Text style={styles.fallbackText}>
            No goals added.
            <Text style={{ color: Colors.primary }}> Add some!!</Text>
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "GOALS",
  };
};

const styles = StyleSheet.create({
  fallback: {
    padding: 5,
    marginHorizontal: 5,
    backgroundColor: "white",
  },
  fallbackText: {
    fontSize: 25,
    fontFamily: "montserrat-bold",
  },
});

export default GoalsScreen;
