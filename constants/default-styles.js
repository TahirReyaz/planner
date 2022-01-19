import { StyleSheet } from "react-native";
import Colors from "./Colors";

export default StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topMenu: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    padding: 5,
    backgroundColor: "white",
    justifyContent: "space-between",
    margin: 5,
  },
  styledContainer: {
    backgroundColor: "white",
    borderBottomColor: Colors.primary,
    borderLeftColor: Colors.primary,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderBottomLeftRadius: 10,
    padding: 5,
  },
  styledInput: {
    backgroundColor: "white",
    borderBottomColor: Colors.primary,
    borderLeftColor: Colors.primary,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 10,
    paddingBottom: 4,
    fontSize: 20,
  },
});
