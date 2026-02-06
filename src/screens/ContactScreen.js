import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Colors from '../constants/colors';

export default function ContactScreen() {
    const handleEmail = () => {
        Linking.openURL('mailto:support@aitextanalyzer.com');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Contact Us</Text>
            <Text style={styles.text}>
                Have questions or feedback? We'd love to hear from you.
            </Text>

            <TouchableOpacity style={styles.button} onPress={handleEmail}>
                <Text style={styles.buttonText}>Email Support</Text>
            </TouchableOpacity>

            <View style={styles.infoBox}>
                <Text style={styles.label}>Developer</Text>
                <Text style={styles.value}> MUKETE PRINCEWILL</Text>

                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>cr7yome9@gmail.com</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 16,
    },
    text: {
        fontSize: 16,
        color: Colors.textSecondary,
        marginBottom: 32,
        lineHeight: 24,
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 40,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    infoBox: {
        backgroundColor: Colors.surface,
        padding: 24,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    label: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: 4,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    value: {
        fontSize: 18,
        color: Colors.text,
        fontWeight: '500',
        marginBottom: 20,
    }
});
