import React, { useState } from "react";
import { View, StyleSheet, Text, Button, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import Colors from "../../constants/Colors";
import Activity from "../../components/Activity";
import Form from "../../components/Form";
import * as dayActions from "../../store/actions/dayActions";

const ScheduleScreen = (props) => {
  const [showForm, setShowForm] = useState(false);
  const activities = useSelector((state) => state.schedule.activities);

  const dispatch = useDispatch();

  const onAddHandler = (text, time, color) => {
    dispatch(dayActions.addActivity(text, time, color));
  };

  return (
    <View style={styles.screen}>
      {!showForm && (
        <Button
          title="Add Task"
          color={Colors.primary}
          onPress={() => setShowForm(true)}
        />
      )}
      {showForm && (
        <View style={styles.form}>
          <Form onCancel={() => setShowForm(false)} onAdd={onAddHandler} />
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
