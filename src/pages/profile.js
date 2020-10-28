import React from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { selectUserName } from '../modules/users/userSlice.js';
import { page_styles } from '../pages.js';
import card_styles from './cardStyle.js';

export function Profile() {
  const [firstName, lastName] = useSelector(selectUserName);
  return (
    <View style={page_styles.app_scrollview}>
      <View style={styles.page_card}>
        <Text style={styles.card_text}>
          <Text style={styles.title_text}>
            Ambassador Profile: {firstName} {lastName}
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ...card_styles,
  ...{
  },
});
