import React from 'react';

import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { page_styles } from '../pages.js';

export function ChallengeSubmissions(props) {
  let navigation = useNavigation();
  console.log(props.route);
  //let submissionQueryResult = useGetAmbassadorApplication();
  return (
    <View style={page_styles.app_scrollview}>
      <Text>Challenge Submission:</Text>
      <Text>
        {props.route.params.id ? props.route.params.id : 'None'}
      </Text>
    </View>
  );
}

