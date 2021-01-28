import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import { page_styles } from '../pages.js';
import card_styles from './cardStyle.js';
import common_styles from '../components/commonStyle.js';


export function CreateChallengePage() {
  return (
    <View style={page_styles.app_scrollview}>
      <View style={styles.page_card}>
        <Text style={styles.title_text}>Create New Challenge:</Text>
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
