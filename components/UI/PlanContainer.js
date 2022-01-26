import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import PlanItem from "./PlanItem";
import NewPlanItemForm from "./NewPlanItemForm";
import defaultStyles from "../../constants/default-styles";
import Colors from "../../constants/Colors";

const PlanContainer = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const showDetailsIcon =
    props.plans && props.plans.length > 0 ? "md-caret-down" : "md-add-circle";

  return (
    <View style={{ ...defaultStyles.styledContainer, margin: 5 }}>
      <View style={styles.summaryContainer}>
        <View style={styles.timeNtitle}>
          <View
            style={{
              ...styles.timeContainer,
              flexDirection: showDetails ? "row" : "column",
            }}
          >
            <Text style={styles.time}>{props.time}</Text>
            {props.day && <Text style={styles.time}>{props.day}</Text>}
          </View>
          {!showDetails && (
            <View>
              {props.plans && props.plans.length > 0 ? (
                <Text style={styles.text}>
                  {props.plans[0].task.length < 21
                    ? props.plans[0].task
                    : props.plans[0].task.substring(0, 18) + "..."}
                </Text>
              ) : (
                <Text
                  style={{ ...styles.text, color: "grey" }}
                >{`No plans for this ${props.type}`}</Text>
              )}
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          {props.plans && props.plans.length > 0 && (
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              size={23}
              color={Colors.red}
              onPress={props.onClear}
            />
          )}
          <Ionicons
            name={showDetails ? "md-caret-up" : showDetailsIcon}
            size={25}
            color="grey"
            style={{ marginLeft: 10 }}
            onPress={() => {
              setShowDetails((prevState) => !prevState);
            }}
          />
        </View>
      </View>
      {showDetails && (
        <View style={styles.itemContainer}>
          {props.plans &&
            props.plans.map((plan) => (
              <PlanItem
                title={plan.task}
                id={plan.id}
                key={`${props.time}${plan.id}`}
                checked={plan.checked}
                max={17}
                onCheck={() => props.onCheck(plan.id, props.id)}
                onDel={() => props.onDel(plan.id, props.id)}
              />
            ))}
          <NewPlanItemForm onAdd={(task) => props.onAdd(task)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeNtitle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
  },
  timeContainer: {
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontFamily: "montserrat",
    marginRight: 5,
  },
  time: {
    fontSize: 14,
    fontFamily: "montserrat-bold",
    marginRight: 5,
    lineHeight: 14,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  itemContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default PlanContainer;
