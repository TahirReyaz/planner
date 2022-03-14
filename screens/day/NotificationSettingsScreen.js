import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
  Text,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as Notifications from "expo-notifications";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

import Colors from "../../constants/Colors";
import MyButton from "../../components/UI/MyButton";
import NotificationSwitch from "../../components/UI/Switch";
import * as notifSettingsActions from "../../store/actions/notifSettingsActions";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationSettingsScreen = () => {
  const settings = useSelector((state) => state.notifSettings);
  const notifications = useSelector((state) => state.notifications);
  console.log("---------------------------\n");
  const [expoPushToken, setExpoPushToken] = useState("");
  const dispatch = useDispatch();

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then((token) =>
  //     setExpoPushToken(token)
  //   );
  // }, []);

  useEffect(() => {
    scheduleNotificationsHandler(notifications, expoPushToken);
  }, [notifications, expoPushToken]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        alwaysBounceVertical={true}
      >
        <Text style={[styles.headingText, { marginVertical: 10 }]}>
          Toggle Notifications of specific days{" "}
          <Text style={{ color: Colors.primary }}>on</Text> and{" "}
          <Text style={{ color: Colors.primary }}>off</Text>
        </Text>
        <View style={styles.switchContainer}>
          {settings.map((day) => (
            <NotificationSwitch
              key={day.name}
              label={day.label}
              state={day.value}
              disabled={notifications[day.name] ? false : true}
              onChange={() => {
                dispatch(notifSettingsActions.updateSettings(day.name));
              }}
            />
          ))}
        </View>

        <View style={{ marginTop: 10, height: 50 }}>
          <MyButton
            title="CANCEL NOTIFICATIONS"
            onPress={cancelNotificationsHandler}
            color={Colors.primary}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
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
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  switchContainer: {
    width: "100%",
    margin: 20,
  },
  btnContainer: {
    flexDirection: "column",
    width: "70%",
  },
  fallback: {
    padding: 5,
    marginHorizontal: 5,
    backgroundColor: "white",
  },
  headingText: {
    fontSize: 20,
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

const scheduleNotificationsHandler = async (
  allNotifications,
  expoPushToken
) => {
  let notifications = [];
  console.log({ expoPushToken });

  const everydayNotifications = everyDaysNotificationsScheduleHandler(
    allNotifications["Everyday"] ? allNotifications["Everyday"] : []
  );
  const weekendsNotifications = weekEndsNotificationsScheduleHandler(
    allNotifications["Weekends"] ? allNotifications["Weekends"] : []
  );
  const weekdaysNotifications = weekDaysNotificationsScheduleHandler(
    allNotifications["Weekdays"] ? allNotifications["Weekdays"] : []
  );
  // const unscheduledWeekendNotifs =
  //   allNotifications["Sat"] && allNotifications["Sun"]
  //     ? allNotifications["Sat"].concat(allNotifications["Sun"])
  //     : [];
  // const weekendsNotifications = weekEndsNotificationsScheduleHandler(
  //   unscheduledWeekendNotifs
  // );
  notifications = [...everydayNotifications];

  cancelNotificationsHandler();

  notifications.forEach(async (notification) => {
    // await Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: notification.title,
    //     body: notification.body,
    //   },
    //   trigger: notification.trigger,
    // });
  });
};

const everyDaysNotificationsScheduleHandler = (everydayNotifications) => {
  let trigger, i;
  const notifications = [];

  for (i = 0; i < 14; i++) {
    everydayNotifications.forEach((notification) => {
      trigger = new Date(Date.now());
      const triggerTime = new Date(notification.currentTime);
      trigger.setDate(trigger.getDate() + i);
      trigger.setHours(triggerTime.getHours());
      trigger.setMinutes(triggerTime.getMinutes());
      trigger.setSeconds(0);

      notifications.push({
        title:
          moment(notification.currentTime).format("h:mm A") +
          ": " +
          notification.currentTitle,
        body:
          moment(notification.nextTime).format("h:mm A") +
          ": " +
          notification.nextTitle,
        trigger,
      });
    });
  }

  return notifications;
};
const weekEndsNotificationsScheduleHandler = (weekendNotifs) => {
  let trigger, i;
  const notifications = [];
  const today = new Date();
  const currentDay = today.getDay();
  let firstWeekendDay;

  // select the closest saturday date
  if (currentDay === 6) {
    firstWeekendDay = new Date(today);
  } else if (currentDay === 0) {
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    firstWeekendDay = new Date(yesterday);
  } else {
    const lastDay = today.getDate() - (today.getDay() - 1) + 6;
    firstWeekendDay = new Date(today.setDate(lastDay));
  }

  console.log({ saturday: firstWeekendDay.toLocaleDateString() });

  // Compose weekend notifs for next 7 weeks
  for (i = 0; i < 7; i++) {
    weekendNotifs.forEach((notification) => {
      for (let j = 0; j < 2; j++) {
        trigger = new Date(Date.now());
        const triggerTime = new Date(notification.currentTime);
        trigger.setDate(firstWeekendDay.getDate() + j + 7 * i); // j represents the sat(j=0) or sun(j=1)
        trigger.setHours(triggerTime.getHours());
        trigger.setMinutes(triggerTime.getMinutes());
        trigger.setSeconds(0);

        notifications.push({
          title:
            moment(notification.currentTime).format("h:mm A") +
            ": " +
            notification.currentTitle,
          body:
            moment(notification.nextTime).format("h:mm A") +
            ": " +
            notification.nextTitle,
          trigger,
        });
      }
    });
  }

  return notifications;
};
const weekDaysNotificationsScheduleHandler = (weekdaysNotifs) => {
  let trigger, i;
  const notifications = [];
  const today = new Date();
  const currentDay = today.getDay();
  var firstWeekday = new Date(today);

  // select the closest monday
  while (firstWeekday.getDay() !== 1) {
    firstWeekday.setDate(firstWeekday.getDate() - 1);
  }

  console.log({ monday: firstWeekday.toLocaleDateString() });

  // Compose weekdays notifs for next 7 weeks
  for (i = 0; i < 7; i++) {
    weekdaysNotifs.forEach((notification) => {
      for (let j = 0; j < 5; j++) {
        trigger = new Date(Date.now());
        const triggerTime = new Date(notification.currentTime);
        trigger.setDate(firstWeekday.getDate() + j + 7 * i);
        trigger.setHours(triggerTime.getHours());
        trigger.setMinutes(triggerTime.getMinutes());
        trigger.setSeconds(0);

        notifications.push({
          title:
            moment(notification.currentTime).format("h:mm A") +
            ": " +
            notification.currentTitle,
          body:
            moment(notification.nextTime).format("h:mm A") +
            ": " +
            notification.nextTitle,
          trigger,
        });
      }
    });
  }

  return notifications;
};
const specificDayNotificationsScheduleHandler = (dayNotif) => {};

const cancelNotificationsHandler = async () => {
  const cancellation =
    await Notifications.cancelAllScheduledNotificationsAsync();
  console.log({ cancellation });
};

export default NotificationSettingsScreen;
export { registerForPushNotificationsAsync, scheduleNotificationsHandler };
