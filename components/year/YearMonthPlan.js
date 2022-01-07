import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import * as yearActions from "../../store/actions/yearActions";
import defaultStyles from "../../constants/default-styles";
import NewPlanItemForm from "../UI/NewPlanItemForm";
import PlanItem from "../UI/PlanItem";

const YearMonthPlan = (props) => {
  const plans = useSelector((state) => state.yearPlan[props.year][props.index]);
  const dispatch = useDispatch();

  return (
    <View style={{ ...defaultStyles.styledContainer, marginBottom: 5 }}>
      <View style={styles.titleNbutton}>
        <View>
          <Text style={styles.title}>{props.title}</Text>
        </View>

        <View>
          {plans && plans.length > 0 && (
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              size={23}
              color="red"
              onPress={props.onDel}
            />
          )}
        </View>
      </View>
      <NewPlanItemForm
        onAdd={(task) => dispatch(yearActions.addPlanItem(props.index, task))}
      />
      {(!plans || plans.length === 0) && (
        <View>
          <Text style={styles.text}>No plans for this month</Text>
        </View>
      )}

      <View>
        {plans &&
          plans.map((plan) => (
            <PlanItem
              title={plan.task}
              id={plan.id}
              key={`${props.year}${props.index}${plan.id}`}
              checked={plan.checked}
              max={11}
              onCheck={() =>
                dispatch(yearActions.checkPlanItem(plan.id, props.index))
              }
              onDel={() =>
                dispatch(yearActions.delPlanItem(plan.id, props.index))
              }
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
});

export default YearMonthPlan;
