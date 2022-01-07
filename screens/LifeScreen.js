import React from "react";
import { View, StyleSheet, SafeAreaView, Text, FlatList } from "react-native";
import defaultStyles from "../constants/default-styles";
import { useSelector, useDispatch } from "react-redux";

import PlanContainer from "../components/UI/PlanContainer";
import { currentYear } from "../constants/years";
import * as lifeActions from "../store/actions/lifeActions";

const LifeScreen = (props) => {
  const plansObject = useSelector((state) => state.lifePlan);
  const plans = [];
  for (const key in plansObject) {
    plans.push(plansObject[key]);
  }
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={defaultStyles.topMenu}>
        <Text>Keep Your Goals in your sight.</Text>
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={plans}
          keyExtractor={(item, index) => `lifeYear${index}`}
          renderItem={(itemData) => (
            <PlanContainer
              id={itemData.index}
              plans={itemData.item}
              time={`${currentYear + itemData.index}`}
              onClear={() => dispatch(lifeActions.clearPlan(itemData.index))}
              onCheck={(id, index) =>
                dispatch(lifeActions.checkPlanItem(id, index))
              }
              onDel={(id, index) =>
                dispatch(lifeActions.delPlanItem(id, index))
              }
              onAdd={(task) =>
                dispatch(lifeActions.addPlanItem(itemData.index, task))
              }
            />
          )}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export const screenOptions = (navData) => {
  return {
    headerTitle: "Life Planner",
  };
};

export default LifeScreen;
