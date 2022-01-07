import React from "react";
import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useSelector, useDispatch } from "react-redux";

import MonthDayPlan from "../components/UI/MonthPlanDay";
import * as monthActions from "../store/actions/monthActions";
import defaultStyles from "../constants/default-styles";

const MonthPlanScreen = (props) => {
  const selectedMonth = useSelector((state) => state.monthPlan.selectedMonth);
  const plans = useSelector((state) => state.monthPlan[selectedMonth]);
  const dispatch = useDispatch();
  const monthChangeHandler = (month) => {
    dispatch(monthActions.changeMonth(month));
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={defaultStyles.topMenu}>
        <Picker
          selectedValue={selectedMonth}
          style={{ width: 150 }}
          onValueChange={monthChangeHandler}
          mode="dropdown"
        >
          <Picker.Item label="January" value="Jan" />
          <Picker.Item label="February" value="Feb" />
          <Picker.Item label="March" value="Mar" />
          <Picker.Item label="April" value="Apr" />
          <Picker.Item label="May" value="May" />
          <Picker.Item label="June" value="Jun" />
          <Picker.Item label="July" value="Jul" />
          <Picker.Item label="August" value="Aug" />
          <Picker.Item label="September" value="Sep" />
          <Picker.Item label="October" value="Oct" />
          <Picker.Item label="November" value="Nov" />
          <Picker.Item label="December" value="Dec" />
        </Picker>
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={plans}
          keyExtractor={(item, index) => `${index}${selectedMonth}`}
          renderItem={(itemData) => (
            <MonthDayPlan
              id={itemData.index}
              plans={itemData.item}
              time={`${selectedMonth} ${itemData.index + 1}`}
              onDel={() => dispatch(monthActions.clearPlan(itemData.index))}
            />
          )}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Planner",
  };
};

const styles = StyleSheet.create({
  topMenu: {
    flexDirection: "row",
    height: 50,
    padding: 5,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
});

export default MonthPlanScreen;