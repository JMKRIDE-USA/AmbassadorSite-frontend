import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

export function Header() {
  return (
    <View
      style={styles.container}
    >
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 100,
    width: "100%",
    backgroundColor: "#080808",
  },
  logo: {
    height: 100,
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
  },
  text: {
    color: '#ffffff',
  },
  button: {},
});

