import React, { useState } from "react";
import { View, StyleSheet, Text, Button, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Picker } from "@react-native-picker/picker";

import Colors from "../../constants/Colors";
import Activity from "../../components/Activity";
import Form from "../../components/Form";
import * as dayActions from "../../store/actions/dayActions";

const ScheduleScreen = (props) => {
  const [showForm, setShowForm] = useState(false);
  const selectedDay = useSelector((state) => state.schedule.selectedDay);
  const activities = useSelector(
    (state) => state.schedule.schedules[selectedDay]
  );
  const dispatch = useDispatch();

  const onAddHandler = (text, time, color) => {
    dispatch(dayActions.addActivity(selectedDay, text, time, color));
  };

  const dayChangeHandler = (day) => {
    dispatch(dayActions.changeDay(day));
  };

  return (
    <View style={styles.screen}>
      <View style={styles.topMenu}>
        <Picker
          selectedValue={selectedDay}
          style={{ width: 150 }}
          onValueChange={dayChangeHandler}
          mode="dropdown"
        >
          <Picker.Item label="Monday" value="Mon" />
          <Picker.Item label="Tuesday" value="Tue" />
          <Picker.Item label="Wednesday" value="Wed" />
          <Picker.Item label="Thursday" value="Thu" />
          <Picker.Item label="Friday" value="Fri" />
          <Picker.Item label="Satday" value="Sat" />
          <Picker.Item label="Sunday" value="Sun" />
        </Picker>

        <Button
          title={!showForm ? "Add Task" : "Close Form"}
          color={Colors.primary}
          onPress={() => setShowForm(prevState => !prevState)}
        />
      </View>
      {showForm && (
        <View style={styles.form}>
          <Form onAdd={onAddHandler} />
        </View>
      )}
      {(!activities || activities.length === 0) && (
        <View style={styles.fallback}>
          <Text style={styles.fallbackText}>
            Schedule not set yet. Add some activities
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
          />
        )}
      />
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Schedule",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#E5E5E5",
  },
  topMenu: {
    flexDirection: "row",
    height: 50,
    padding: 5,
    backgroundColor: "white",
    justifyContent: "space-between",
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
    fontWeight: "bold",
  },
});

export default ScheduleScreen;
