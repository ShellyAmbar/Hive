import {StyleSheet} from "react-native";
export default StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  svg: {
    justifyContent: "center",
    alignItems: "center",
  },

  arrow: {},
  modalBack: {flex: 1, alignItems: "center", justifyContent: "center"},
  modal: {
    height: 400,
    width: "80%",
    backgroundColor: "#342342",
    borderRadius: 12,
    padding: 12,
  },
  item: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  itemImage: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
  text: {fontSize: 16, color: "#FFF"},
  list: {
    padding: 20,
    marginBottom: 20,
  },
});
