import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "../../constants/Colors";

const PercentageBar = (props) => {
  const styles = StyleSheet.create({
    container: {
      marginVertical: 5,
      height: 50,
      backgroundColor: Colors.lighterGrey,
      borderRadius: 10,
      overflow: "hidden",
    },
    progress: {
      height: "100%",
      width: `${props.percentage}%`,
      backgroundColor: props.color,
    },
    textContainer: {
      position: "absolute",
      width: "100%",
      height: "100%",
    },
    text: {
      color: "white",
      fontSize: 36,
      fontWeight: "bold",
      textShadowColor: "rgb(0, 0, 0)",
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 1,
      textAlign: "center",
      textAlignVertical: "center",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.progress}></View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{props.percentage}%</Text>
      </View>
    </View>
  );
};

export default PercentageBar;
