import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

const NotificationSwitch = (props) => {
  return (
    <View style={styles.container}>
      <Text>{props.label}</Text>
      <Switch value={props.state} onValueChange={props.onChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 50,
  },
});

export default NotificationSwitch;
