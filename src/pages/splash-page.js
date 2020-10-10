import React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

import { page_styles } from '../pages.js';


export function SplashPage() {
  let [fontsLoaded] = useFonts({
    'JMKRIDE': require('../assets/JMKRIDE-font.ttf'),
  });
	if(!fontsLoaded) { return <></>; }
  return (
    <View style={page_styles.app_scrollview}>
      <View style={styles.page}>
        <Text style={styles.title_text}>AMBASSADOR PORTAL</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    textAlign: "center",
  },
	title_text: {
		fontFamily: 'JMKRIDE',
		fontSize: "50px",
	}
});
