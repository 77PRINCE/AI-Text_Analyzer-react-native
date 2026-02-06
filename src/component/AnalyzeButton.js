import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, View } from 'react-native';
import Colors from '../constants/colors';

export default function AnalyzeButton({ onPress, loading }) {
  return (
    <TouchableOpacity
      style={[styles.button, loading && styles.buttonDisabled]}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <View style={styles.loadingContent}>
          <ActivityIndicator size="small" color="#FFF" />
          <Text style={styles.loadingText}>Analyzing...</Text>
        </View>
      ) : (
        <Text style={styles.text}>Analyze Text</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    ...Colors.shadow,
  },
  buttonDisabled: {
    backgroundColor: Colors.border,
    opacity: 0.8,
  },
  text: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  loadingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFF',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
  }
});
