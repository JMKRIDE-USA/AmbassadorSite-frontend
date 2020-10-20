import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { page_styles } from '../pages.js';
import { setAuthState } from '../modules/auth/authSlice.js';

const mapDispatchToProps = { setAuthState };


export default connect(null, mapDispatchToProps)(({ setAuthState }) => {
  return (
    <View style={page_styles.app_scrollview}>
      <Text>Challenge Board</Text>
      <TouchableOpacity onPress={() => setAuthState('user')}>
        <Text> Button </Text>
      </TouchableOpacity>
    </View>
  );
});
