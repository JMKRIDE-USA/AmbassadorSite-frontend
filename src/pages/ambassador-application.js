import React from 'react';

import { View, Text } from 'react-native';

import page_styles from '../styles/pageStyle.js';
import { useGetAmbassadorApplication } from '../modules/challenges/hooks.js';
import { FullChallengeDisplay } from '../components/challenge-display.js';

export function AmbassadorApplication() {
  let challengeQueryResult = useGetAmbassadorApplication();
  return (
    <View style={page_styles.app_scrollview}>
      { challengeQueryResult.data && (Object.keys(challengeQueryResult.data).length !== 0)
        ? <FullChallengeDisplay challengeId={challengeQueryResult.data}/>
        : <Text> Loading... </Text>
      }
    </View>
  );
}

