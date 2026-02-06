import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import Colors from '../constants/colors';

export default function AboutScreen() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>About AI Text Analyzer</Text>
                <Text style={styles.text}>
                    Version 1.0.0
                </Text>
                <Text style={styles.text}>
                    This application uses Google Gemini Flash 1.5 to provide instant sentiment analysis, summarization, and tone detection for any text input.
                </Text>

                <View style={styles.techSection}>
                    <Text style={styles.subTitle}>Tech Stack</Text>
                    <Text style={styles.techItem}>• React Native (Expo)</Text>
                    <Text style={styles.techItem}>• Google Gemini API</Text>
                    <Text style={styles.techItem}>• Node.js Backend</Text>
                </View>

                <Text style={styles.footer}>
                    Created BY : <Text style={styles.link} onPress={() => Linking.openURL('https://example.com')}>YOME-TECH</Text>
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        padding: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 16,
    },
    subTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.primary,
        marginBottom: 12,
        marginTop: 24,
    },
    text: {
        fontSize: 16,
        color: Colors.textSecondary,
        lineHeight: 24,
        marginBottom: 16,
    },
    techSection: {
        backgroundColor: Colors.surface,
        padding: 16,
        borderRadius: 12,
        marginTop: 10,
    },
    techItem: {
        fontSize: 16,
        color: Colors.text,
        marginBottom: 8,
    },
    footer: {
        marginTop: 40,
        textAlign: 'center',
        color: Colors.textSecondary,
        fontStyle: 'italic',
    },
    link: {
        color: Colors.primary,
        textDecorationLine: 'underline',
    }
});
