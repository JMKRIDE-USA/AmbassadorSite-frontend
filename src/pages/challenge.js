import React from 'react';

import { View, Text } from 'react-native';

import { page_styles } from '../pages.js';
import { FullChallengeDisplay } from '../components/challenge-display.js';

export function ChallengePage(props) {
  if(props.route.params && props.route.params.id) {
    return (
      <View style={page_styles.app_scrollview}>
        <FullChallengeDisplay challengeId={props.route.params.id}/>
      </View>
    )
  }
  return (
    <View style={page_styles.app_scrollview}>
      <Text> Challenge Board </Text>
    </View>
  );
}

