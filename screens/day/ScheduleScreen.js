import React, { useState } from "react";
import { View, StyleSheet, Text, Button, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import Colors from "../../constants/Colors";
import Activity from "../../components/Activity";
import Form from "../../components/Form";

const ScheduleScreen = (props) => {
  const [showForm, setShowForm] = useState(false);
  const activities = useSelector((state) => state.schedule.activities);

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
          <Form onCancel={() => setShowForm(false)} />
        </View>
      )}
      <FlatList
        data={activities}
        renderItem={(itemData) => (
          <Activity
            title={itemData.item.activity}
            time={moment(itemData.item.time).format("h:mm A")}
            color={Colors.primary}
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
});

export default ScheduleScreen;
