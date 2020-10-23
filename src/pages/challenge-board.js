import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { page_styles } from '../pages.js';
import { resetAuth } from '../modules/auth/authSlice.js';
import { logoutUser } from '../modules/users/userSlice.js';

const mapDispatchToProps = { resetAuth, logoutUser };


export default connect(null, mapDispatchToProps)(({ resetAuth, logoutUser }) => {
  function logout() {
    resetAuth()
    logoutUser()
  }
  return (
    <View style={page_styles.app_scrollview}>
      <Text>Challenge Board</Text>
      <TouchableOpacity onPress={() => logout()}>
        <Text> Reset Auth </Text>
      </TouchableOpacity>
    </View>
  );
});
