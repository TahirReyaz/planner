import React from "react";
import { View, StyleSheet, Text, SafeAreaView, Button } from "react-native";
import { useSelector } from "react-redux";
import * as Notifications from "expo-notifications";
import moment from "moment";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: false,
    };
  },
});

const ToggleDaysScreen = (props) => {
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
  };

  const cancelNotificationsHandler = async () => {
    const cancellation =
      await Notifications.cancelAllScheduledNotificationsAsync();
    console.log(cancellation);
  };

  return (
    <SafeAreaView>
      <Text>Schedule Settings</Text>
      <Button
        title="Refresh schedule notifications"
        onPress={scheduleNotificationsHandler}
      />
      <Button
        title="Cancel Notifications"
        onPress={cancelNotificationsHandler}
      />
    </SafeAreaView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Toggle Days",
  };
};

const styles = StyleSheet.create({});

export default ToggleDaysScreen;
