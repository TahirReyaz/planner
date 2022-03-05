import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";

const MyButton = (props) => {
  const styles = StyleSheet.create({
    title: {
      fontFamily: "montserrat",
      color: props.textColor ? props.textColor : "white",
      textAlign: "center",
    },
    button: {
      backgroundColor: props.color,
      justifyContent: props.icon ? "space-around" : "center",
      alignItems: "center",
      flexDirection: "row",
      padding: 4,
      paddingHorizontal: 8,
      borderRadius: 2,
      elevation: 5,
      height: "100%",
    },
  });

  return (
    <Pressable
      onPress={props.onPress}
      style={styles.button}
      android_ripple={{ color: Colors.lighterGrey }}
    >
      <Text style={styles.title}>{props.title}</Text>
      {props.icon && props.icon}
    </Pressable>
  );
};

export default MyButton;
