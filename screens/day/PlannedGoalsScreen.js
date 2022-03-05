import React, { useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

import PlannedGoalContainer from "../../components/goals/PlannedGoalContainer";
import NewPlannedGoalForm from "../../components/goals/NewPlannedGoalForm";
import * as plannedGoalsActions from "../../store/actions/plannedGoalsActions";
import defaultStyles from "../../constants/default-styles";
import Colors from "../../constants/Colors";
import MyButton from "../../components/UI/MyButton";

const PlannedGoalsScreen = (props) => {
  const [showForm, setShowForm] = useState(false);
  const goals = useSelector((state) => state.plannedGoals.goals);
  const dispatch = useDispatch();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
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
        <NewPlannedGoalForm
          onAdd={(goal, color) =>
            dispatch(plannedGoalsActions.addGoal(goal, color))
          }
        />
      )}

      {goals && goals.length > 0 ? (
        <FlatList
          data={goals}
          keyExtractor={(item, index) => `plannedGoal${index}`}
          renderItem={(itemData) => (
            <PlannedGoalContainer
              tasks={itemData.item.tasks}
              title={itemData.item.title}
              color={itemData.item.color}
              onDel={() =>
                dispatch(plannedGoalsActions.delGoal(itemData.index))
              }
              onCheckTask={(id) =>
                dispatch(plannedGoalsActions.checkTask(id, itemData.index))
              }
              onDelTask={(id) =>
                dispatch(plannedGoalsActions.delTask(id, itemData.index))
              }
              onAddTask={(task) =>
                dispatch(plannedGoalsActions.addTask(itemData.index, task))
              }
            />
          )}
        />
      ) : (
        <View style={styles.fallback}>
          <Text style={styles.fallbackText}>
            No planned goals yet.
            <Text style={{ color: Colors.primary }}> Add some!!</Text>
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "PLANNED GOALS",
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

export default PlannedGoalsScreen;
