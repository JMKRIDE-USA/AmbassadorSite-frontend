import React, { useState } from 'react';

import { View, Text, StyleSheet } from 'react-native';

import { page_styles } from '../pages.js';
import card_styles from './cardStyle.js';
import common_styles from '../components/commonStyle.js';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export function CreateChallengePage() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <View style={page_styles.app_scrollview}>
      <View style={styles.page_card}>
        <Text style={styles.title_text}>Create New Challenge:</Text>
        <DatePicker selected={startDate} onChange={setStartDate} showTimeSelect={true} dateFormat={"Pp"}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  ...card_styles,
  ...common_styles,
  ...{
  }
});
