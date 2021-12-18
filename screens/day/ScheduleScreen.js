import React, { useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import Colors from "../../constants/Colors";

import Activity from "../../components/Activity";
import Form from "../../components/Form";

const ScheduleScreen = (props) => {
  const [showForm, setShowForm] = useState(false);

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
      <Activity title="Activity" time="2:30" color={Colors.primary} />
      <Activity title="Activity" time="2:30" color={Colors.primary} />
      <Activity title="Activity" time="2:30" color={Colors.primary} />
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
