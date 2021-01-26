import card_styles from '../pages/cardStyle.js';

export default {

  /*
   * LIST/ITEM styles
   *  - for lists of individual items in a list
   */

  list: {
    ...card_styles.page_card,
    padding: "10px",
  },
  item_text_small: {
    fontSize: "10px",
  },
  item_text: {
    fontSize: "15px",
    fontWeight: "normal",
  },
  bold_item_text: {
    fontSize: "15px",
    fontWeight: "bold",
  },
  item_view: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "black",
  },
  item_button: {
    width: 100,
    borderRadius: 5,
    padding: "2px",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d5d5d5",
    margin: "10px",
  },
  item_button_text: {
    fontSize: "12px",
    color: "black",
  },
  info_list: {
    marginTop: "15px",
    marginBottom: "10px"
  },
  info_item: {  // used in submission information, (admin) user profile
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  info_item_column: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  standalone_button: { // large outside-of-page-card button
    minWidth: 300,
    height: 50,
    backgroundColor: "lightgray", // override
    borderWidth: "2px",
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "20px",
    marginTop: "10px",
    marginBottom: "10px",
  },
  standalone_button_text: {
    fontSize: 22,
    color: "black",
    padding: "10px",
  },
};