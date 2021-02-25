import React from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as Linking from 'expo-linking';

import { FontAwesome } from '@expo/vector-icons';

import newGithubIssueUrl from 'new-github-issue-url';


function SocialLink({name, url}){
  return (
    <TouchableOpacity style={styles.social_button} onPress={() => Linking.openURL(url)}>
      <FontAwesome name={name} size={30} color="white"/>
    </TouchableOpacity>
  )
}

export function Footer() {
  const github_bugreport_url = newGithubIssueUrl({
    user: 'JMKRIDE-USA',
    repo: 'AmbassadorSite-frontend',
    body: 'What were you doing?\n----\n\nExpected behavior:\n----\n\nActual Behavior:\n----\n\nWhat are the steps you took to cause the issue?\n----\n\nOther details:\n----\n\n',
  })
  const jeff_bugreport_email_url = "mailto:jeff+bugreport@jmkride.com?subject=%5BBug%20Report%5D&body=What%20were%20you%20doing%3F%0D%0A----%0D%0A%0D%0AExpected%20behavior%3A%0D%0A----%0D%0A%0D%0AActual%20behavior%3A%0D%0A----%0D%0A%0D%0AWhat%20are%20the%20steps%20you%20took%20to%20cause%20the%20issue%3F%0D%0A----%0D%0A%0D%0AOther%20details%3A%0D%0A----%0D%0A";

  return (
    <View style={styles.container}>
      <View style={styles.visible_container}>
        <View style={styles.left_side}>
          <Text style={styles.social_font}>Having issues?</Text>
          <Text style={styles.link} onPress={() => Linking.openURL(github_bugreport_url)}>
            File a bug
          </Text>
          <Text>
            <Text style={styles.link} onPress={() => Linking.openURL(jeff_bugreport_email_url)}>Or email me</Text>
          </Text>
        </View>
        <View style={styles.right_side}>
          <Text style={styles.social_font}> Follow Us:   </Text>
          <SocialLink name="instagram" url="https://instagram.com/jmkride"/>
          <SocialLink name="facebook" url="https://facebook.com/jmkride"/>
          <SocialLink name="twitter" url="https://twitter.com/jmkride"/>
          <SocialLink name="youtube" url="https://youtube.com/c/JMKRIDERollWithUs"/>
        </View>
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
  right_side: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: "50px",
  },
  left_side: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    margin: "10px",
  },
  visible_container: {
    maxWidth: 1000,
    width: "100%",
    height: "100%",
    minWidth: 200,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  link: {
    color: "white",
    fontSize: "15px",
    textDecorationLine: "underline",
  },
  sub_font: {
    color: "white",
    fontSize: "15px",
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
