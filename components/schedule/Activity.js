import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import defaultStyles from "../../constants/default-styles";

const Activity = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const styles = StyleSheet.create({
    container: {
      margin: 5,
      borderLeftColor: props.color,
      borderBottomColor: props.color,
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
    <View style={{ ...defaultStyles.styledContainer, ...styles.container }}>
      <View style={styles.summaryContainer}>
        <View style={styles.timeNtitle}>
          <View>
            <Text style={styles.text}>{props.time}</Text>
          </View>
          {!showDetails && (
            <View>
              <Text style={styles.text}>
                {props.title.length < 15
                  ? props.title
                  : props.title.substring(0, 15) + "..."}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.buttonContainer}>
          {props.title.length > 14 && (
            <Ionicons
              name={showDetails ? "md-caret-up" : "md-caret-down"}
              size={25}
              color="grey"
              style={{ marginHorizontal: 10 }}
              onPress={() => {
                setShowDetails((prevState) => !prevState);
              }}
            />
          )}
          <Ionicons
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            size={23}
            color="red"
            onPress={props.onDel}
          />
        </View>
      </View>
      {showDetails && (
        <View style={styles.fullTitle}>
          <Text style={styles.text}>{props.title}</Text>
        </View>
      )}
    </View>
  );
};

export default Activity;
