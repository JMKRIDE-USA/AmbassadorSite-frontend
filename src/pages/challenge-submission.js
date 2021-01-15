import React from 'react';

import { View } from 'react-native';

import { page_styles } from '../pages.js';

import { 
  FullChallengeSubmissionDisplay,
  SubmissionList,
} from '../components/submission-display.js';

export function ChallengeSubmissions(props) {
  if(props.route.params.id){
    return (
      <View style={page_styles.app_scrollview}>
        <FullChallengeSubmissionDisplay submissionId={props.route.params.id}/>
      </View>
    )
  }
  return (
    <View style={page_styles.app_scrollview}>
      <SubmissionList/>
    </View>
  )
}

