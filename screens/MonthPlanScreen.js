import React from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useSelector, useDispatch } from "react-redux";

import PlanContainer from "../components/UI/PlanContainer";
import * as monthActions from "../store/actions/monthActions";
import defaultStyles from "../constants/default-styles";
import { monthDays } from "../constants/months";
import { weekDays } from "../constants/days";

const MonthPlanScreen = (props) => {
  const selectedMonth = useSelector((state) => state.monthPlan.selectedMonth);
  const plans = useSelector((state) => state.monthPlan[selectedMonth]);
  const dispatch = useDispatch();
  const month = monthDays.find((month) => month.mon === selectedMonth);

  const monthChangeHandler = (month) => {
    dispatch(monthActions.changeMonth(month));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
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
          removeClippedSubviews={false}
          keyExtractor={(item, index) => `monthDay${index}${selectedMonth}`}
          renderItem={(itemData) => (
            <PlanContainer
              id={itemData.index}
              type="day"
              plans={itemData.item}
              time={`${selectedMonth} ${itemData.index + 1}`}
              day={weekDays[(month.firstDay + (itemData.index % 7)) % 7]}
              onClear={() => dispatch(monthActions.clearPlan(itemData.index))}
              onCheck={(id, index) =>
                dispatch(monthActions.checkPlanItem(id, index))
              }
              onDel={(id, index) =>
                dispatch(monthActions.delPlanItem(id, index))
              }
              onAdd={(task) =>
                dispatch(monthActions.addPlanItem(itemData.index, task))
              }
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

export default MonthPlanScreen;
