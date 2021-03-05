import card_styles from './cardStyle.js';
import config from '../config.js';

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
    fontFamily: config.body_font,
  },
  item_text: {
    fontSize: "15px",
    fontFamily: config.body_font,
  },
  bold_item_text: {
    fontSize: "15px",
    fontFamily: config.bold_body_font,
  },
  item_view: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "black",
    paddingTop: "5px",
    paddingBottom: "5px",
  },
  item_button: {
    width: 100,
    borderRadius: 5,
    padding: "2px",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d5d5d5",
    marginLeft: "10px",
    marginRight: "10px",
  },
  item_button_text: {
    fontSize: "12px",
    color: "black",
    fontFamily: config.body_font,
  },
  info_list: {
    marginTop: "15px",
    marginBottom: "10px"
  },
  info_item: {  // used in submission information, (admin) user profile
    flexDirection: "row",
    alignItems: "center",
    flexWrap: 'wrap',
    justifyContent: "space-between",
  },
  info_item_column: {
    flexDirection: "row",
    alignItems: "center",
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
    fontFamily: config.title_font,
    color: "black",
    padding: "10px",
  },
};
