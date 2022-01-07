import React from "react";
import { View, StyleSheet, SafeAreaView, Text, FlatList } from "react-native";
// import { useSelector, useDispatch } from "react-redux";

// import PlanContainer from "../components/UI/PlanContainer";
// import * as monthActions from "../store/actions/monthActions";

const MonthPlanScreen = (props) => {
  // const selectedMonth = useSelector((state) => state.monthPlan.selectedMonth);
  // const plans = useSelector((state) => state.monthPlan[selectedMonth]);
  // const dispatch = useDispatch();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.topMenu}>
        <Text>Keep Your Goals in your sight.</Text>
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        {/* <FlatList
          data={plans}
          keyExtractor={(item, index) => `${index}${selectedMonth}`}
          renderItem={(itemData) => (
            <PlanContainer
              id={itemData.index}
              plans={itemData.item}
              time={`${selectedMonth} ${itemData.index + 1}`}
              onDel={() => dispatch(monthActions.clearPlan(itemData.index))}
            />
          )}
        /> */}
        <Text>Life Screen</Text>
      </SafeAreaView>
    </SafeAreaView>
  );
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

export const screenOptions = (navData) => {
  return {
    headerTitle: "Life Planner",
  };
};

export default MonthPlanScreen;
