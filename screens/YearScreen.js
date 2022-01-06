import React from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useSelector, useDispatch } from "react-redux";

import YearMonthPlan from "../components/year/YearMonthPlan";
import * as yearActions from "../store/actions/yearActions";
import defaultStyles from "../constants/default-styles";
import years from "../constants/years";

const months = [
  { name: "January", value: "Jan" },
  { name: "February", value: "Feb" },
  { name: "March", value: "Mar" },
  { name: "April", value: "Apr" },
  { name: "May", value: "May" },
  { name: "June", value: "Jun" },
  { name: "July", value: "Jul" },
  { name: "August", value: "Aug" },
  { name: "September", value: "Sep" },
  { name: "October", value: "Oct" },
  { name: "November", value: "Nov" },
  { name: "December", value: "Dec" },
];

const YearScreen = (props) => {
  const selectedYear = useSelector((state) => state.yearPlan.selectedYear);
  // const monthPlans = useSelector((state) => state.yearPlan[selectedYear]);
  const dispatch = useDispatch();
  const yearChangeHandler = (year) => {
    dispatch(yearActions.changeYear(year));
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={defaultStyles.topMenu}>
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
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.monthsContainer}>
          <View style={styles.col}>
            {months.slice(0, 5).map((month) => (
              <YearMonthPlan
                title={month.name}
                mon={month.value}
                key={month.value}
                year={selectedYear}
              />
            ))}
          </View>
          <View style={styles.col}>
            {months.slice(6, 11).map((month) => (
              <YearMonthPlan
                title={month.name}
                mon={month.value}
                key={month.value}
                year={selectedYear}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Year Planner",
  };
};

const styles = StyleSheet.create({
  monthsContainer: {
    flexDirection: "row",
    padding: 5,
    justifyContent: "space-between",
  },
  col: {
    flex: 0.49,
  },
});

export default YearScreen;
