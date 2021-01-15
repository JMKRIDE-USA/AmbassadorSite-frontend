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
  },
  item_view: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
};
