import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

// import * as monthActions from "../../store/actions/monthActions";
import defaultStyles from "../../constants/default-styles";
import NewPlanItemForm from "../UI/NewPlanItemForm";
import PlanItem from "../UI/PlanItem";

const YearMonthPlan = (props) => {
  const plans = useSelector((state) => state.yearPlan[props.mon]);
  // const dispatch = useDispatch();

  return (
    <View style={{ ...defaultStyles.styledContainer, marginBottom: 5 }}>
      <View style={styles.titleNbutton}>
        <View>
          <Text style={styles.title}>{props.title}</Text>
        </View>

        <View>
          {props.plans && props.plans.length > 0 && (
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              size={23}
              color="red"
              // onPress={props.onDel}
            />
          )}
        </View>
      </View>
      {(!plans || plans.length === 0) && (
        <View>
          <Text style={styles.text}>No plans for this day</Text>
        </View>
      )}
      <NewPlanItemForm
        onAdd={() => {}}
        // onAdd={(task) => dispatch(monthActions.addPlanItem(props.id, task))}
      />

      <View style={styles.itemContainer}>
        {props.plans &&
          props.plans.map((plan) => (
            <PlanItem
              title={plan.task}
              id={plan.id}
              key={plan.id}
              checked={plan.checked}
              // onCheck={() =>
              //   dispatch(monthActions.checkPlanItem(plan.id, props.id))
              // }
              // onDel={() =>
              //   dispatch(monthActions.delPlanItem(plan.id, props.id))
              // }
              onCheck={() => {}}
              onDel={() => {}}
            />
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleNbutton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginRight: 5,
  },
  itemContainer: {
    // flexDirection: "row",
    // flexWrap: "wrap",
  },
});

export default YearMonthPlan;
