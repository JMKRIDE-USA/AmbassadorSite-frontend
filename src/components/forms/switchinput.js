import React from 'react';
import {
  View,
  Picker,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { FieldError } from 'react-hook-form';

export default React.forwardRef(
  (props, ref): React.ReactElement => {
    const { label, labelStyle, error, switchOptions, ...inputProps } = props;

    return (
      <View style={styles.container}>
        {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
        <Picker
          autoCapitalize="none"
          ref={ref}
          style={[styles.input, { borderColor: error ? '#fc6d47' : '#000000' }]}
          {...inputProps}
        >
          {switchOptions.map(item =>
            <Picker.Item label={item} value={item}/>
          )}
        </Picker>
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
