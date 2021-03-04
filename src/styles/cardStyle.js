import { Dimensions } from 'react-native';

import config from '../config.js';

export default {
  page_card: {
    marginTop: "30px",
    margin: "10px",
    maxWidth: Math.min(0.9 * Dimensions.get('window').width, 800),
    backgroundColor: "white",
    borderColor: "#080808",
    borderWidth: "2px",
    borderRadius: "20px",
    flexDirection: "column",
    padding: "10px",
    justifyContent: "center",
  },
  title_card_text: {
    color: "#080808",
    fontFamily: config.title_font,
    textAlign: "center",
  },
  body_card_text: {
    fontFamily: config.body_font,
    fontWeight: "light",
    textAlign: "left",
  },
  title_text: {
    fontSize: "30px",
    fontFamily: config.title_font,
  },
  sub_title_text: {
    fontSize: "24px",
    fontFamily: config.body_font,
    fontWeight: "light",
    color: "#333333",
    textAlign: "center",
  },
  title_text_alt: {
    fontWeight: "light",
    fontFamily: config.title_font,
    fontSize: "30px",
    color: "white",
  },
  body_text: {
    fontSize: "18px",
    fontFamily: config.body_font,
    fontWeight: "normal",
  },
  bold_body_text: {
    fontSize: "18px",
    fontFamily: config.bold_body_font,
  },
};
