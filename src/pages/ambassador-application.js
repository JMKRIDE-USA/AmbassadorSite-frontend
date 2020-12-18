import React from 'react';

import { View, Text } from 'react-native';

import { page_styles } from '../pages.js';
import { useGetAmbassadorApplication } from '../modules/challenges/hooks.js';
import { ChallengeDisplay } from '../components/challenge-display.js';

export function AmbassadorApplication() {
  let challengeQueryResult = useGetAmbassadorApplication();
  return (
    <View style={page_styles.app_scrollview}>
      { (Object.keys(challengeQueryResult.data).length !== 0 && challengeQueryResult.data)
        ? <ChallengeDisplay challengeId={challengeQueryResult.data}/>
        : <Text> Loading... </Text>
      }
    </View>
  );
}

