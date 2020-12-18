import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
} from 'react-native';

export default React.forwardRef(
  (props, ref) => {
    const { label, labelStyle, error, onValueChange, id, ...inputProps } = props;

    return (
      <View key={id} style={styles.container}>
        {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
        <TextInput
          autoCapitalize="none"
          onChangeText={onValueChange}
          ref={ref}
          style={[styles.input, { borderColor: error ? '#fc6d47' : '#000000' }]}
          {...inputProps}
        />
        <Text style={styles.textError}>{error && error.message}</Text>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  input: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingLeft: 5,
    fontSize: 16,
    height: 40,
    color: '#000000',
  },
  label: {
    paddingVertical: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  textError: {
    color: '#fc6d47',
    fontSize: 14,
  },
});
