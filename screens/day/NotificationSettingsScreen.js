import React, { useState, useEffect } from "react";
import { View, StyleSheet, Platform, Button, Text } from "react-native";
import { useSelector } from "react-redux";
import * as Notifications from "expo-notifications";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

import Colors from "../../constants/Colors";
import MyButton from "../../components/UI/MyButton";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationSettingsScreen = () => {
  const notifications = useSelector((state) => state.notifications["Everyday"]);
  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
  }, []);

  const cancelNotificationsHandler = async () => {
    const cancellation =
      await Notifications.cancelAllScheduledNotificationsAsync();
    console.log(cancellation);
  };

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      {notifications && notifications.length > 0 ? (
        <View style={styles.btnContainer}>
          <MyButton
            title="REFRESH SCHEDULED NOTIFICATIONS"
            onPress={() =>
              scheduleNotificationsHandler(notifications, expoPushToken)
            }
            color={Colors.primary}
          />
          <View style={{ marginTop: 10 }}>
            <MyButton
              title="CANCEL NOTIFICATIONS"
              onPress={cancelNotificationsHandler}
              color={Colors.primary}
            />
          </View>
        </View>
      ) : (
        <View style={styles.fallback}>
          <Text style={styles.fallbackText}>
            Schedule not set yet. Add some
            <Text style={{ color: Colors.primary }}> tasks</Text>
          </Text>
        </View>
      )}
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "NOTIFICATION SETTINGS",
    drawerIcon: (props) => (
      <Ionicons
        name={Platform.OS === "android" ? "md-alarm" : "ios-alarm"}
        size={23}
        color={props.color}
      />
    ),
  };
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "column",
    width: "50%",
    height: 50,
  },
  fallback: {
    padding: 5,
    marginHorizontal: 5,
    backgroundColor: "white",
  },
  fallbackText: {
    fontSize: 25,
    fontFamily: "montserrat-bold",
  },
});

async function registerForPushNotificationsAsync() {
  let token;
  // if (Constants.isDevice) {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token); // } else {
  //   alert("Must use physical device for Push Notifications");
  // }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("everyday", {
      name: "everyday",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: Colors.primary,
    });
  }

  return token;
}
const scheduleNotificationsHandler = async (notifications, expoPushToken) => {
  let trigger, i;
  // Set notifications for a week
  for (i = 0; i < 7; i++) {
    notifications.forEach(async (notification) => {
      trigger = new Date(Date.now());
      const triggerTime = new Date(notification.currentTime);
      trigger.setDate(trigger.getDate() + i);
      trigger.setHours(triggerTime.getHours());
      trigger.setMinutes(triggerTime.getMinutes());
      trigger.setSeconds(0);

      console.log(trigger.toLocaleString());

      await Notifications.scheduleNotificationAsync({
        content: {
          title:
            moment(notification.currentTime).format("h:mm A") +
            ": " +
            notification.currentTitle,
          body:
            moment(notification.nextTime).format("h:mm A") +
            ": " +
            notification.nextTitle,
        },
        trigger,
      });
    });
  }
};

export default NotificationSettingsScreen;
