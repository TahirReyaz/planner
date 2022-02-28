import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";

import Colors from "../constants/Colors";

const features = [
  "Add your schedule and plans for different days, months and years.",
  "Get notified for every new schedule event.",
  "Set goals and update their progress.",
  "The data you enter is not sent to any server",
  "Everything you enter is stored on your phone to maintain privacy.",
];
const aboutApp = [
  "Made with React Native",
  "Expo managed workflow",
  "Storage of plans on device using redux-persist and AsyncStorage",
];
const upcomingFeatures = [
  "Proper working notifications instead of demo notifications",
  "Huge reduction in App size",
  "Animations for better user experience",
];

const AboutScreen = (props) => {
  const linkClickHandler = () => {
    Linking.openURL("https://tahirreyaz.github.io/portfolio-1/");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ImageBackground
        source={require("../assets/calendar.png")}
        style={styles.bgImg}
        imageStyle={{
          resizeMode: "cover",
          bottom: 0,
          top: undefined,
          opacity: 0.6,
        }}
      >
        <ScrollView>
          <Text style={styles.heading}>Features</Text>
          {features.map((text, index) => (
            <View style={styles.listItem} key={index}>
              <Text style={styles.listText}>{text}</Text>
            </View>
          ))}
          <Text style={styles.heading}>About the App</Text>
          {aboutApp.map((text, index) => (
            <View style={styles.listItem} key={index}>
              <Text style={styles.listText}>{text}</Text>
            </View>
          ))}
          <Text style={styles.heading}>Upcoming Features</Text>
          {upcomingFeatures.map((text, index) => (
            <View style={styles.listItem} key={index}>
              <Text style={styles.listText}>{text}</Text>
            </View>
          ))}

          <View style={{ alignSelf: "flex-end" }}>
            <Text style={styles.madeByText}>
              Made by <Text style={{ color: Colors.primary }}>Tahir</Text>
            </Text>
            <TouchableOpacity onPress={linkClickHandler}>
              <Text style={styles.linkText}>
                More about <Text style={{ color: Colors.primary }}>me</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  bgImg: {
    width: "100%",
    flex: 1,
    height: 300,
  },
  heading: {
    fontSize: 28,
    fontFamily: "montserrat-bold",
    color: Colors.primary,
    marginVertical: 10,
    textDecorationLine: "underline",
    textShadowColor: "white",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  listItem: { marginLeft: 20, marginVertical: 4 },
  listText: {
    fontSize: 16,
    fontFamily: "montserrat",
    color: "black",
    textShadowColor: "white",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  madeByText: {
    fontSize: 28,
    fontFamily: "montserrat-bold",
    color: "black",
    marginTop: 20,
  },
  linkText: {
    fontSize: 16,
    fontFamily: "montserrat",
    textAlign: "right",
    textDecorationLine: "underline",
  },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: "ABOUT",
    drawerIcon: (props) => (
      <Ionicons
        name={Platform.OS === "android" ? "md-cafe" : "ios-cafe"}
        size={23}
        color={props.color}
      />
    ),
  };
};

export default AboutScreen;
