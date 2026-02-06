import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import Colors from '../constants/colors'; 

export default function TextInputBox({ value, onChange }) {
  return (
    <TextInput
      style={styles.input}
      placeholder="Enter text here..."
      value={value}
      onChangeText={onChange}
      multiline
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    minHeight: 80,
    backgroundColor: Colors.inputBackground, // dark green input
    color: Colors.inputText,                 // white text
  },
});
