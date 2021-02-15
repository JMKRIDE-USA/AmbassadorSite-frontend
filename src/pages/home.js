import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { useLinkProps } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { selectAuthPermissions } from '../modules/auth/authSlice.js';
import { getApplyPage } from './app.js';
import { AUTH_STATE } from '../modules/auth/constants.js';
import { ChallengeBoard } from '../pages/challenge.js';

import page_styles from '../styles/pageStyle.js';
import card_styles from '../styles/cardStyle.js';
import common_styles from '../styles/commonStyle.js';

export function HomePage(props) {
  let auth_permissions = useSelector(selectAuthPermissions);
  if([AUTH_STATE.NONE, AUTH_STATE.USER].includes(auth_permissions)) {
    return <SplashPage/>
  } else if ([AUTH_STATE.AMBASSADOR, AUTH_STATE.ADMIN].includes(auth_permissions)) {
    return <ChallengeBoard {...props}/>
  }
  return (
    <View style={styles.app_scrollview}>
      <View style={styles.page_card}>
        <Text style={styles.title_text}>Home</Text>
      </View>
    </View>
  );
}

export function SplashPage() {
  let [fontsLoaded] = useFonts({
    'JMKRIDE': require('../assets/JMKRIDE-font.ttf'),
  });

  let auth_permissions = useSelector(selectAuthPermissions);
  let apply_page = getApplyPage(auth_permissions);
  const goApplyPage = useLinkProps({to: "/" + apply_page.url});

	if(!fontsLoaded) { return <></> }

  return (
    <View style={styles.app_scrollview}>
      <View style={styles.page}>
        <Text style={styles.title_text}>
          Welcome to the JMKRIDE Ambassador Portal.<br/>
        </Text>
        <Text style={styles.title_text_alt}>
          Remember to...
        </Text>
        <Text style={styles.jmk_text}>ROLL WITH US</Text>

        <View style={styles.dotted_line}>
          <Text style={styles.title_text_alt}>
            Our sport is only as healthy as our community.<br/>
          </Text>
        </View>
        <View style={styles.page_card}>
          <Text style={styles.body_card_text}>
            <Text style={styles.title_text}>
              Our Goals:<br/><br/>
            </Text>
            <Text style={styles.body_text}>
              We created this ambassador portal with the sole purpose of
              helping to foster and grow the freeskate community. We hope to use
              this program to assist and encourage others to overcome the
              initial difficulties of learning to freeskate, to envision
              themselves as a freeskater, and to join, form, and participate in
              their local communities.
            </Text>
          </Text>
        </View>
        <View style={styles.page_card}>
          <Text style={styles.body_card_text}>
            <Text style={styles.title_text}>
              What We're Looking For in a Great Ambassador:<br/><br/>
            </Text>
            <Text style={styles.body_text}>
              If you've done much freeskating in public places you'll know that
              the skates really turn heads! Everyone who rides freeskates is in
              a very real way already an ambassador! So when we were envisioning this
              program, we realized we needed to do something more. We want this program to
              be more than just an advertisement. We want our program to encourage
              meaningful interactions with interested people and show them that with your
              help and our youtube tutorials, learning to freeskate is more
              achievable now than ever before!<br/><br/>
              We want to know that you're a freeskater to your core. That
              doesn't mean you have to be a pro! But you should be stoked on practicing
              frequently and constantly improving. We want you to like what you're doing.
              So you should be friendly and approachable when you are out and about, and
              you should enjoy discussing this awesome new sport. Along with that, it
              would be great if you were an active participant in our online freeskating
              community, since that is such a strong anchor for our community especially
              during the COVID-19 pandemic.
            </Text>
          </Text>
        </View>
        <View style={styles.page_card}>
          <Text style={styles.body_card_text}>
            <Text style={styles.title_text}>
              About the program:<br/><br/>
            </Text>
            <Text style={styles.body_text}>
              - Each ambassador will get their own unique discount/affiliate
                code which they can share with anyone in-person or online.<br/>
              - Anyone who uses that code awards the owner with ambassador
                points equivalent to 10% of the purchased value.<br/>
              - At least once a month, we will post challenges on our 'challenge board'. 
                These will be things like 'teach a brand new person and document
                their progress.' The actual challenges will of course have much
                more clarifications than this example.<br/>
              - Ambassador points can be used on our site, and eventually may be
                eligible to be exchanged for cold hard ca$h!
            </Text>
          </Text>
        </View>
        <View style={styles.call_to_action}>
          <Text style={styles.title_text}>
            Think you're the right person for the job?
          </Text>
          <View style={styles.cta_row}>
            <Text style={styles.title_text_alt}>
              Submit your application here:
            </Text>
            <TouchableOpacity
              style={styles.cta_button}
              onPress={goApplyPage.onPress}
            >
              <Text style={styles.cta_button_text}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  ...card_styles,
  ...common_styles,
  ...page_styles,
  ...{
    page: {
      paddingTop: "30px",
      textAlign: "center",
      maxWidth: "800px",
    },
    jmk_text: {
      fontFamily: 'JMKRIDE',
      fontSize: "50px",
      marginTop: "5px",
      marginBottom: "15px",
    },
    dotted_line: {
      borderStyle: "dotted",
      borderBottomWidth: "3px",
      borderColor: "white",
      paddingBottom: "30px",
      marginBottom: "10px",
      marginRight: "30px",
      marginLeft: "30px",
    },
    call_to_action: {
      marginTop: "50px",
      alignItems: "center",
    },
    cta_row: {
      flexDirection: "row",
      alignItems: "center",
    },
    cta_button: {
      width: "100px",
      height: "50px",
      backgroundColor: "white",
      borderWidth: "2px",
      borderColor: "black",
      alignItems: "center",
      justifyContent: "center",
      margin: "20px",
    },
    cta_button_text: {
      color: "black",
      fontSize: "22px",
    },
  },
});
