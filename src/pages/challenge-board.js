import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { page_styles } from '../pages.js';
import { resetAuth } from '../modules/auth/authSlice.js';

const mapDispatchToProps = { resetAuth };


export default connect(null, mapDispatchToProps)(({ resetAuth }) => {
  return (
    <View style={page_styles.app_scrollview}>
      <Text>Challenge Board</Text>
      <TouchableOpacity onPress={() => resetAuth()}>
        <Text> Button </Text>
      </TouchableOpacity>
    </View>
  );
});
