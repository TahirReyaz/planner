import React from "react";
import { View, StyleSheet, Text, SafeAreaView, FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useSelector, useDispatch } from "react-redux";

import MonthDayPlan from "../../components/month/MonthPlanDay";
import * as monthActions from "../../store/actions/monthActions";

const MonthPlanScreen = (props) => {
  const selectedMonth = useSelector((state) => state.monthPlan.selectedMonth);
  const plans = useSelector((state) => state.monthPlan.plans[selectedMonth]);
  console.log("------------------------------------");
  console.log(plans);
  const dispatch = useDispatch();
  const monthChangeHandler = (month) => {
    dispatch(monthActions.changeMonth(month));
  };
  return (
    <SafeAreaView>
      <View>
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
      <View>
        {(!plans || plans.length === 0) && (
          <View style={styles.fallback}>
            <Text style={styles.fallbackText}>
              Schedule not set yet. Add some plans
            </Text>
          </View>
        )}
        <FlatList
          data={plans}
          keyExtractor={(item, index) => index}
          renderItem={(itemData) => (
            <MonthDayPlan
              id={itemData.index}
              plans={itemData.item}
              time={`${selectedMonth} ${itemData.index + 1}`}
              onDel={() => dispatch(monthActions.clearPlan(itemData.index))}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Schedule",
  };
};

const styles = StyleSheet.create({});

export default MonthPlanScreen;
