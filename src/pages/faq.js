import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Linking from 'expo-linking';

import page_styles from '../styles/pageStyle.js';
import card_styles from '../styles/cardStyle.js';
import common_styles from '../styles/commonStyle.js';

const QAs = [
  [
    "Where can I give out my discount code?",
    "You can post your discount code wherever you'd like! " +
    "Online, offline, or anywhere in between! ;)\n" +
    "BUT, if we find your code on any of those bulk-discount code sites, " +
    "(the ones you can find just by googling 'JMKRIDE discount code'), we will " +
    "change it and email you about it."
  ],
  [
    "How can I connect with my fellow ambassadors?",
    "Click the button to be taken to our Ambassadors-only FB page. " +
    "Request to join and I will approve your request ASAP!",
    "https://www.facebook.com/groups/1611571015700692"
  ],
  [
    "How do I upload an image or video for a submission?",
    "Currently, because I'm new to hosting a public website and don't yet have a good " +
    "scalable data storage solution, you'll need to use an external site to upload " +
    "an image or video.\n" +
    "If you already have the image uploaded on your social page, and its privacy is public, then " +
    "you can just figure out how to copy the link to the post. Otherwise, " +
    "you can choose any site as long as I can access it, but here are my recommendations:" + 
    "\n\n" +
    "For uploading a video, I'd recommend YouTube. To keep the video private, " +
    "you can choose to upload it as an 'unlisted' video, which means only those who " +
    "have the link (just me) will be able to watch the video. " +
    "\n" +
    "For an image, I'd recommend imgur.com/upload. Again, to keep the image private, " +
    "just click 'hidden' under the 'Post' section, which will only allow those with the " +
    "link to view the images." +
    "\n\n" +
    "NOTE: By linking images or videos in your submissions you agree to let JMKRIDE use " +
    "the content on our social media or website however we choose. We will try to be " +
    "clear of our intentions for every piece of media you submit, and of course you are " +
    "free to reach out if we do anything that you're not comfortable with and we will " +
    "do our best to make it right."
  ],
  [
    "How much are my ambassador points worth?",
    "I aligned it so that 500 points should get you a brand-new pair of skates! " +
    "(excluding shipping). So when converting to store gift-card credits, I will " + 
    "multiply your points by 0.25."
  ],
  [
    "How do I trade in my ambassador points for a JMKRIDE store gift card?",
    "For now, this is a manual process, so just send me an email, and I'll " +
    "zero your ambassador point balance and send you a gift card equivalent to " +
    "$(points * 0.25) in store credits!"
  ],
  [
    "Do you have any business cards that I can use to promote my ambassador code?",
    "Yes! Click the link to download the pdf, which has our website and a place to " +
    "write in your discount code.",
    "https://www.dropbox.com/s/vxt1epxm6f973p0/AmbassadorCards.pdf?" +
    "dl=0&fbclid=IwAR2xT9xrTe7RbqWwSLTo8rDc0cBLApZRcgGKQBrE8dO7UPtlf-p0zc5ttNU"
  ],
  [
    "How do I exchange my ambassador points for cash?",
    "Sorry, at the moment this is not possible, we still need to speak with our tax guy " +
    "to find out how we can legally pay people and iron out other details with the site."
  ],
  [
    "Do I have to complete all the challenges?",
    "Nope! They're all optional. You can choose to do none and just distribute " +
    "your discount code.",
  ],
]

function QA(qa, index) {
  const [question, answer, link] = qa;
  return (
    <View style={[styles.page_card, {alignItems: "center"}]} key={index}>
      <Text style={styles.title_text}>{question}</Text>
      <Text style={styles.body_text}>{answer}</Text>
      { link 
        ? <TouchableOpacity
            style={styles.item_button}
            onPress={() => Linking.openURL(link)}
          >
            <Text style={styles.item_button_text}>Visit Link</Text>
          </TouchableOpacity>
        : <></>
      }
    </View>
  )
}

export function FAQPage() {
  return (
    <View style={styles.app_scrollview}>
      <View style={styles.page_card}>
        <Text style={styles.title_text}>
          Frequently Asked Questions:
        </Text>
        <Text style={{textAlign: 'center', marginTop: 10}}>
          <Text style={styles.body_text}>
            {"Didn't find your answer here?"}<br/>
          </Text>
          <Text
            style={[styles.body_text, {textDecorationLine: "underline"}]}
            onPress={() => Linking.openURL("mailto:jeff@jmkride.com")}
          >
            Send me an email.
          </Text>
        </Text>
      </View>
      { QAs.map(QA) }
    </View>
  )
}

const styles = StyleSheet.create({
  ...card_styles,
  ...common_styles,
  ...page_styles,
  ...{
  },
});
