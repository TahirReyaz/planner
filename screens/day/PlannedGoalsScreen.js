import React, { useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  Platform,
} from "react-native";
// import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

// import GoalItem from "../../components/goals/GoalItem";
// import NewGoalForm from "../../components/goals/NewGoalForm";
// import * as goalActions from "../../store/actions/goalsActions";
import defaultStyles from "../../constants/default-styles";
import Colors from "../../constants/Colors";

const PlannedGoalsScreen = (props) => {
  // const [showForm, setShowForm] = useState(false);
  // const goals = useSelector((state) => state.goals.goals);
  // const dispatch = useDispatch();

  const goals = false;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <View style={defaultStyles.topMenu}>
        <View></View>
        <View>
          <Button
            title={!showForm ? "Add Goal" : "Close Form"}
            color={Colors.primary}
            onPress={() => setShowForm((prevState) => !prevState)}
          />
        </View>
      </View> */}
      {/* {showForm && (
        <NewGoalForm
          onAdd={(goal, objName, total, completed, color) =>
            dispatch(
              goalActions.addGoal(goal, objName, total, completed, color)
            )
          }
        />
      )} */}

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
            Coming
            <Text style={{ color: Colors.primary }}> soon...</Text>
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
