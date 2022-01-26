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
    // Shadow
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  styledContainer: {
    backgroundColor: "white",
    borderBottomColor: Colors.primary,
    borderLeftColor: Colors.primary,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderBottomLeftRadius: 10,
    padding: 5,
    // Shadow
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
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
