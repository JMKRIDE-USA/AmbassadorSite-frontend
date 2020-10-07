import { StyleSheet } from 'react-native'


export const styles = StyleSheet.create({
  desktop_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#080808",
    minHeight: "100px",
  },
  mobile_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    minHeight: "80px",
    backgroundColor: "#080808",
  },
  header_visible: {
    flex: -1,
    flexDirection: "row",
    maxWidth: 1440,
    width: "90%",
  },
  header_right: {
    flex: 1,
    padding: "1em",
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
  },
  header_left: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  mobilelogo: {
    flex: 1,
    height: 80,
    maxWidth: 250,
    resizeMode: 'center',
  },
  biglogo: {
    flex: 1,
    maxWidth: "300px",
    height: "120px",
    resizeMode: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
  },
  text: {
    color: '#ffffff',
  },
  menu_button: {
    flex: 1,
    maxHeight: 50,
    minHeight: 20,
  },
});

export const desktopHeaderButtons_styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    minWidth: 100,
    height: 50,
    borderRightWidth: "1px",
    borderColor: "#808080",
    paddingLeft: 50,
    paddingRight: 50,
  },
  button_style:{
    alignItems: "center",
    justifyContent: "center",
  },
  button_text: {
    fontSize: 18,
    color: "white",
  },
});

export const mobileHeaderButtons_styles = StyleSheet.create({
  view: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-around",
    minHeight: "100%",
    top: "80px",
    width: "100%",
  },
  button: {
    minHeight: 20,
    borderBottomWidth: "2px",
    borderColor: "#808080",
  },
  button_style: {
    alignItems: "center",
    justifyContent: "center",
  },
  button_text: {
    color: "white",
    padding: 10, 
  },
});
