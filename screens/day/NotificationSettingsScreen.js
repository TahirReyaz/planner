import React from "react";
import { View, StyleSheet, Platform, Button } from "react-native";
import { useSelector } from "react-redux";
import * as Notifications from "expo-notifications";
import { Ionicons } from "@expo/vector-icons";
// import * as TaskManager from "expo-task-manager";
import moment from "moment";
import Colors from "../../constants/Colors";

// const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

// TaskManager.defineTask(
//   BACKGROUND_NOTIFICATION_TASK,
//   ({ data, error, executionInfo }) => {
//     console.log("Received a notification in the background!");
//     console.log(data);
//     console.log(executionInfo);
//     console.log(error);
//     // Do something with the notification data
//   }
// );

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: false,
    };
  },
});

const NotificationSettingsScreen = (props) => {
  const notifications = useSelector((state) => state.notifications["Everyday"]);

  const scheduleNotificationsHandler = () => {
    let trigger;
    notifications.forEach((notification) => {
      trigger = new Date(Date.now());
      const triggerTime = new Date(notification.currentTime);
      trigger.setHours(triggerTime.getHours());
      trigger.setMinutes(triggerTime.getMinutes());
      trigger.setSeconds(0);

      console.log(trigger.toLocaleTimeString());

      Notifications.scheduleNotificationAsync({
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
    // Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);
  };

  const cancelNotificationsHandler = async () => {
    const cancellation =
      await Notifications.cancelAllScheduledNotificationsAsync();
    console.log(cancellation);
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <View style={styles.btnContainer}>
        <Button
          title="Refresh scheduled notifications"
          onPress={scheduleNotificationsHandler}
          color={Colors.primary}
        />
        <View style={{ marginTop: 10 }}>
          <Button
            title="Cancel Notifications"
            onPress={cancelNotificationsHandler}
            color={Colors.primary}
          />
        </View>
      </View>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Notification Settings",
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
  },
});

export default NotificationSettingsScreen;
