import { StyleSheet } from 'react-native'


const common_styles = {
  header_visible: {
    flex: -1,
    flexDirection: "row",
    maxWidth: 1440,
    width: "100%",
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
    padding: "1em",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    color: '#ffffff',
    fontSize: 14,
  },
  text: {
    color: '#ffffff',
  },
  menu_button: {
    flex: 1,
    maxHeight: 50,
    minHeight: 20,
  },
};

export const desktop_styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  header_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#080808",
    minHeight: "100px",
  },
  logo: {
    flex: 1,
    maxWidth: "300px",
    height: "120px",
    resizeMode: 'center',
  },
  ...common_styles,
});

export const mobile_styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  header_container: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    height: "80px",
    backgroundColor: "#080808",
  },
  logo: {
    flex: 1,
    height: 80,
    maxWidth: 250,
    resizeMode: 'center',
  },
  menutoggle: {
    paddingRight: 20,
  },
  ...common_styles,
});

export const desktopHeaderButtons_styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 30,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    height: 50,
    borderRightWidth: "1px",
    borderColor: "#808080",
    paddingLeft: 30,
    paddingRight: 30,
  },
  textview: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    color: "white",
  },
});

export const mobileHeaderButtons_styles = StyleSheet.create({
  view: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    minHeight: "100%",
    top: "80px",
  },
  button: {
    minHeight: 20,
    borderBottomWidth: "2px",
    borderColor: "#808080",
  },
  textview: {
    alignItems: "center",
    minWidth: 250,
    justifyContent: "center",
  },
  text: {
    color: "white",
    padding: 10, 
  },
});
