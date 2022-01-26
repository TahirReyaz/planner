import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  Button,
  FlatList,
} from "react-native";
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

const ScheduleScreen = (props) => {
  const [showForm, setShowForm] = useState(false);
  const selectedDay = useSelector((state) => state.schedule.selectedDay);
  const activities = useSelector(
    (state) => state.schedule.schedules[selectedDay]
  );
  const notifications = useSelector(
    (state) => state.notifications[selectedDay]
  );
  const dispatch = useDispatch();

  const scheduleCreator = () => {
    let newNotifications = [];
    for (let i = 0; i < activities.length - 1; i++) {
      const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
      const newNotification = new NotificationItem(
        id,
        activities[i].activity,
        activities[i].time,
        activities[i + 1].activity,
        activities[i + 1].time
      );
      newNotifications.push(newNotification);
    }
    dispatch(
      notificationActions.setNotifications(selectedDay, newNotifications)
    );
  };

  const onAddHandler = (text, time, color) => {
    dispatch(dayActions.addActivity(selectedDay, text, time, color));
    scheduleCreator();
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
          mode="dropdown"
        >
          <Picker.Item label="Everyday" value="Everyday" />
          <Picker.Item label="Monday" value="Mon" />
          <Picker.Item label="Tuesday" value="Tue" />
          <Picker.Item label="Wednesday" value="Wed" />
          <Picker.Item label="Thursday" value="Thu" />
          <Picker.Item label="Friday" value="Fri" />
          <Picker.Item label="Saturday" value="Sat" />
          <Picker.Item label="Sunday" value="Sun" />
        </Picker>

        <Button
          title={!showForm ? "Add Task" : "Close Form"}
          color={Colors.primary}
          onPress={() => setShowForm((prevState) => !prevState)}
        />
      </View>
      {showForm && (
        <View style={styles.form}>
          <NewActivityForm onAdd={onAddHandler} />
        </View>
      )}
      {(!activities || activities.length === 0) && (
        <View style={styles.fallback}>
          <Text style={styles.fallbackText}>
            Schedule not set yet. Add some{" "}
            <Text style={{ color: Colors.primary }}>tasks</Text>
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
              scheduleCreator();
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
