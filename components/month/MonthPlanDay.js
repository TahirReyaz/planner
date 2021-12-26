import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";

const MonthDayPlan = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const styles = StyleSheet.create({
    container: {
      margin: 5,
      padding: 5,
      backgroundColor: "white",
      borderBottomColor: Colors.primary,
      borderLeftColor: Colors.primary,
      borderBottomWidth: 5,
      borderLeftWidth: 5,
      borderBottomLeftRadius: 10,
    },
    summaryContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    timeNtitle: {
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    text: {
      fontSize: 20,
      marginRight: 5,
    },
    buttonContainer: {
      flexDirection: "row",
    },
    fullTitle: {
      margin: 5,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.summaryContainer}>
        <View style={styles.timeNtitle}>
          <View>
            <Text style={styles.text}>{props.time}</Text>
          </View>
          {!showDetails && (
            <View>
              <Text style={styles.text}>{props.plans[0].task}</Text>
            </View>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Ionicons
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            size={23}
            color="red"
            onPress={props.onDel}
          />
          <Ionicons
            name={showDetails ? "md-caret-up" : "md-caret-down"}
            size={20}
            color="grey"
            style={{ marginHorizontal: 10 }}
            onPress={() => {
              setShowDetails((prevState) => !prevState);
            }}
          />
        </View>
      </View>
      {showDetails && (
        <View style={styles.fullTitle}>
          {props.plans.map((plan) => (
            <View key={plan.id}>
              <Text style={styles.text}>{plan.task}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default MonthDayPlan;
