import React, { useState, useEffect, useReducer } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
  Text,
} from "react-native";
import { useSelector } from "react-redux";
import * as Notifications from "expo-notifications";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

import Colors from "../../constants/Colors";
import MyButton from "../../components/UI/MyButton";
import NotificationSwitch from "../../components/UI/Switch";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const SETTINGS_UPDATE = "SETTINGS_UPDATE";

const initialSettingsState = [
  { label: "Every Day", name: "Everyday", value: true },
  { label: "Weekdays", name: "Weekdays", value: false },
  { label: "Sunday", name: "Sun", value: false },
  { label: "Monday", name: "Mon", value: false },
  { label: "Tuesday", name: "Tue", value: false },
  { label: "Wednesday", name: "Wed", value: false },
  { label: "Thursday", name: "Thu", value: false },
  { label: "Friday", name: "Fri", value: false },
  { label: "Saturday", name: "Sat", value: false },
];
const settingsReducer = (state, action) => {
  if (action.type === SETTINGS_UPDATE) {
    const updatedState = [...state];

    // react to weekday and everyday switches
    if (
      action.name === "Weekdays" &&
      updatedState[1].value === false &&
      updatedState[0].value === true
    ) {
      updatedState[0].value = false;
    } else if (
      action.name === "Everyday" &&
      updatedState[0].value === false &&
      updatedState[1].value === true
    ) {
      updatedState[1].value = false;
    }

    // react to other switches, including everyday and weekdays
    const changedDayIndex = updatedState.findIndex(
      (day) => day.name === action.name
    );
    updatedState[changedDayIndex].value = !updatedState[changedDayIndex].value;

    return [...updatedState];
  }
  return state;
};

const NotificationSettingsScreen = () => {
  const notifications = useSelector((state) => state.notifications["Everyday"]);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [settingsState, dispatchSettingsState] = useReducer(
    settingsReducer,
    initialSettingsState
  );

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

  const onSwitchToggle = (day) => {
    dispatchSettingsState({
      type: SETTINGS_UPDATE,
      name: day,
    });
  };

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
          {settingsState.map((day) => (
            <NotificationSwitch
              key={day.name}
              label={day.label}
              state={day.value}
              onChange={() => onSwitchToggle(day.name)}
            />
          ))}
        </View>

        {/* {notifications && notifications.length > 0 ? (
          <View style={styles.btnContainer}>
            <View style={{ height: 50 }}>
              <MyButton
                title="REFRESH SCHEDULED NOTIFICATIONS"
                onPress={() =>
                  scheduleNotificationsHandler(
                    notifications,
                    expoPushToken,
                    "Everyday"
                  )
                }
                color={Colors.primary}
              />
            </View>
            <View style={{ marginTop: 10, height: 50 }}>
              <MyButton
                title="CANCEL NOTIFICATIONS"
                onPress={cancelNotificationsHandler}
                color={Colors.primary}
              />
            </View>
          </View>
        ) : (
          <View style={styles.fallback}>
            <Text style={styles.headingText}>
              Schedule not set yet. Add some
              <Text style={{ color: Colors.primary }}> tasks</Text>
            </Text>
          </View>
        )} */}
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
  notifications,
  expoPushToken,
  day
) => {
  let trigger, i;
  // Set notifications for a week
  for (i = 0; i < 2; i++) {
    notifications.forEach(async (notification) => {
      trigger = new Date(Date.now());
      const triggerTime = new Date(notification.currentTime);
      if (day === "Everyday") {
        trigger.setDate(trigger.getDate() + i);
      }
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
export { registerForPushNotificationsAsync, scheduleNotificationsHandler };
