import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";
import Activity from "../../components/schedule/Activity";
import NewActivityForm from "../../components/schedule/NewActivityForm";
import * as dayActions from "../../store/actions/dayActions";
import * as notificationActions from "../../store/actions/notificationsActions";
import defaultStyles from "../../constants/default-styles";
import NotificationItem from "../../models/notification-item";
import MyButton from "../../components/UI/MyButton";
import { scheduleNotificationsHandler } from "./NotificationSettingsScreen";
import { weekDays } from "../../constants/days";

const ScheduleScreen = (props) => {
  const [showForm, setShowForm] = useState(false);
  const selectedDay = useSelector((state) => state.schedule.selectedDay);
  console.log({ selectedDay });
  const activities = useSelector(
    (state) => state.schedule.schedules[selectedDay]
  );
  const notifications = useSelector(
    (state) => state.notifications[selectedDay]
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (activities) {
      let newNotifications = [],
        newNotification;

      if (activities.length === 1) {
        const id =
          Date.now().toString(36) + Math.random().toString(36).substr(2);
        newNotification = new NotificationItem(
          id,
          activities[0].activity,
          activities[0].time,
          "No more tasks",
          activities[0].time
        );
        newNotifications.push(newNotification);
      } else {
        for (let i = 0; i < activities.length; i++) {
          const id =
            Date.now().toString(36) + Math.random().toString(36).substr(2);
          newNotification = new NotificationItem(
            id,
            activities[i].activity,
            activities[i].time,
            i < activities.length - 1
              ? activities[i + 1].activity
              : activities[0].activity,
            i < activities.length - 1
              ? activities[i + 1].time
              : activities[0].time
          );
          newNotifications.push(newNotification);
        }
      }

      dispatch(
        notificationActions.setNotifications(selectedDay, newNotifications)
      );
      scheduleNotificationsHandler(newNotifications, null, selectedDay);
    }
  }, [selectedDay, activities, dispatch]);

  const onAddHandler = (text, time, color) => {
    dispatch(dayActions.addActivity(selectedDay, text, time, color));
  };

  const dayChangeHandler = (day) => {
    dispatch(dayActions.changeDay(day));
  };

  return (
    <View style={styles.screen}>
      <View style={defaultStyles.topMenu}>
        <Picker
          selectedValue={selectedDay}
          style={{ width: 150 }}
          onValueChange={dayChangeHandler}
          dropdownIconRippleColor={Colors.primary}
        >
          <Picker.Item label="Everyday" value="Everyday" />
          <Picker.Item label="Weekdays" value="Weekdays" />
          <Picker.Item label="Monday" value="Mon" />
          <Picker.Item label="Tuesday" value="Tue" />
          <Picker.Item label="Wednesday" value="Wed" />
          <Picker.Item label="Thursday" value="Thu" />
          <Picker.Item label="Friday" value="Fri" />
          <Picker.Item label="Saturday" value="Sat" />
          <Picker.Item label="Sunday" value="Sun" />
        </Picker>

        <MyButton
          title={!showForm ? "ADD GOAL" : "CLOSE FORM"}
          color={Colors.primary}
          onPress={() => setShowForm((prevState) => !prevState)}
          icon={
            <Ionicons
              name={showForm ? "md-chevron-up" : "md-chevron-down"}
              size={25}
              color="white"
              style={{ marginLeft: 5, marginRight: -5 }}
            />
          }
        />
      </View>
      {showForm && (
        <View style={styles.form}>
          <NewActivityForm
            onAdd={onAddHandler}
            activities={
              activities ? activities.map((activity) => activity.time) : []
            }
          />
        </View>
      )}
      {(!activities || activities.length === 0) && (
        <View style={styles.fallback}>
          <Text style={styles.fallbackText}>
            Schedule not set yet. Add some
            <Text style={{ color: Colors.primary }}> tasks</Text>
          </Text>
        </View>
      )}
      <FlatList
        data={activities}
        renderItem={(itemData) => (
          <Activity
            id={itemData.item.id}
            title={itemData.item.activity}
            time={moment(itemData.item.time).format("h:mm A")}
            color={itemData.item.color}
            onDel={() => {
              dispatch(dayActions.delActivity(itemData.item.id));
            }}
          />
        )}
      />
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "SCHEDULE",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  form: {
    padding: 5,
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

export default ScheduleScreen;
