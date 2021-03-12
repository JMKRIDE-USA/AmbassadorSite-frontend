import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import page_styles from '../styles/pageStyle.js';
import card_styles from '../styles/cardStyle.js';
import common_styles from '../styles/commonStyle.js';

import { useListChallenges } from '../modules/challenges/hooks.js';
import { FullChallengeDisplay, SingleChallengeDisplay } from '../components/challenge-display.js';


export function ChallengeBoard(props) {
  let [showAlert, setShowAlert] = useState(false);
  let {perpage, page} = props.route.params ? props.route.params : {
    perpage: undefined, page: undefined 
  }
  const verifyEmail = useVerifyEmail();
  if(props.route.params && props.route.params.verifyEmail) {
    let result = verifyEmail({key: props.route.params.verifyEmail})
  }
  const challengeQuery = useListChallenges(
    {perPage: perpage, page: page}
  );
  if (challengeQuery.status !== 'success') {
    return (<Text> Challenges Loading... </Text>);
  }
  return (
    <>
      {challengeQuery.data.map(
        challenge => (<SingleChallengeDisplay challenge={challenge} key={challenge._id}/>)
      )}
    </>
  );
}

export function ChallengePage(props) {
  return (
    <View style={styles.app_scrollview}>
      { props.route.params && props.route.params.id
        ? <FullChallengeDisplay challengeId={props.route.params.id}/>
        : <ChallengeBoard {...props}/>
      }
    </View>
  );
}


const styles = StyleSheet.create({
  ...card_styles,
  ...common_styles,
  ...page_styles,
  ...{
  },
});
