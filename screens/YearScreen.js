import React from "react";
import { View, StyleSheet, Text, SafeAreaView, FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useSelector, useDispatch } from "react-redux";

// import MonthDayPlan from "../components/month/MonthPlanDay";
import * as yearActions from "../store/actions/yearActions";

const currentYear = new Date().getFullYear();
const years = [];
for (let i = 0; i < 8; i++) {
  const year = currentYear + i;
  years.push(year.toString());
}

const YearScreen = (props) => {
  const selectedYear = useSelector((state) => state.yearPlan.selectedYear);
  //   const plans = useSelector((state) => state.monthPlan[selectedMonth]);
  const dispatch = useDispatch();
  const yearChangeHandler = (year) => {
    dispatch(yearActions.changeYear(year));
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Picker
          selectedValue={selectedYear}
          style={{ width: 150 }}
          onValueChange={yearChangeHandler}
          mode="dropdown"
        >
          {years.map((year) => (
            <Picker.Item label={year} value={year} key={year} />
          ))}
        </Picker>
      </View>
      {/* <SafeAreaView style={{ flex: 1 }}>
        {(!plans || plans.length === 0) && (
          <View style={styles.fallback}>
            <Text style={styles.fallbackText}>
              Schedule not set yet. Add some plans
            </Text>
          </View>
        )}
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
      </SafeAreaView> */}
    </SafeAreaView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Year Planner",
  };
};

const styles = StyleSheet.create({});

export default YearScreen;
