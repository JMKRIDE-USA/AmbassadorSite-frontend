import React from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as Linking from 'expo-linking';

import { FontAwesome } from '@expo/vector-icons';


function SocialLink({name, url}){
  return (
    <TouchableOpacity style={styles.social_button} onPress={() => Linking.openURL(url)}>
      <FontAwesome name={name} size={30} color="white"/>
    </TouchableOpacity>
  )
}

export function Footer() {
  return (
    <View style={styles.container}>
      <View style={styles.visible_container}>
        <Text style={styles.social_font}> Follow Us:   </Text>
        <SocialLink name="instagram" url="https://instagram.com/jmkride"/>
        <SocialLink name="facebook" url="https://facebook.com/jmkride"/>
        <SocialLink name="twitter" url="https://twitter.com/jmkride"/>
        <SocialLink name="youtube" url="https://youtube.com/c/JMKRIDERollWithUs"/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#080808",
    minHeight: "70px",
    alignItems: "center",
    justifyContent: "stretch",
  },
  visible_container: {
    maxWidth: 1000,
    width: "80%",
    height: "100%",
    minWidth: 300,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  social_font: {
    color: "white",
    fontSize: "20px",
  },
  social_button: {
    marginLeft: "10px",
    marginRight: "10px",
  },
});
