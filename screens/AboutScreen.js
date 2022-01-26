import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";

import defaultStyles from "../constants/default-styles";

const aboutList = [
  "Don't lose sight of your goals.",
  "Notifications are only demo and work on when the app is not killed.",
  "Made by Tahir",
];
const AboutScreen = (props) => {
  const linkClickHandler = () => {
    Linking.openURL("https://tahirreyaz.github.io/portfolio-1/");
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      {aboutList.map((text, index) => (
        <View style={defaultStyles.topMenu} key={index}>
          <Text style={styles.topText}>{text}</Text>
        </View>
      ))}

      <TouchableOpacity
        style={defaultStyles.topMenu}
        onPress={linkClickHandler}
      >
        <Text style={styles.topText}>Portfolio</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  topText: {
    fontSize: 25,
    fontWeight: "bold",
  },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: "About",
    drawerIcon: (props) => (
      <Ionicons
        name={
          Platform.OS === "android"
            ? "md-checkmark-circle-outline"
            : "ios-checkmark-circle-outline"
        }
        size={23}
        color={props.color}
      />
    ),
  };
};

export default AboutScreen;
