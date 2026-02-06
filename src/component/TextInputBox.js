import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeInUp, FadeOut } from 'react-native-reanimated';
import Colors from "../constants/colors";

export default function TextInputBox({ value, onChange, onClear }) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.inputWrapper}>
                <TextInput
                    placeholder="Paste your text here to analyze..."
                    placeholderTextColor={Colors.textSecondary}
                    value={value}
                    onChangeText={onChange}
                    style={[
                        styles.input,
                        isFocused && styles.inputFocused
                    ]}
                    multiline
                    textAlignVertical="top"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                {value.length > 0 && (
                    <Animated.View
                        entering={FadeInUp.springify()}
                        exiting={FadeOut.duration(200)}
                        style={styles.clearButtonContainer}
                    >
                        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
                            <Text style={styles.clearButtonText}>Clear</Text>
                        </TouchableOpacity>
                    </Animated.View>
                )}
            </View>
            <Text style={styles.helperText}>
                {value.length} characters
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    inputWrapper: {
        position: 'relative',
        width: '100%',
    },
    input: {
        backgroundColor: '#FFFFFF', // Using pure white for contrast
        color: Colors.inputText,
        padding: 16,
        paddingBottom: 50,
        borderRadius: 12,
        borderWidth: 1.5, // Slightly thicker border
        borderColor: Colors.border,
        minHeight: 180,
        fontSize: 16,
        lineHeight: 24,
        // Subtle shadow for light mode visibility
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    inputFocused: {
        borderColor: Colors.primary,
        borderWidth: 2,
    },
    clearButtonContainer: {
        position: 'absolute',
        right: 12,
        bottom: 12,
        zIndex: 10,
    },
    clearButton: {
        backgroundColor: Colors.primary, // Solid green background
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        ...Colors.shadow, // Use global shadow
        elevation: 5,
    },
    clearButtonText: {
        color: '#FFFFFF', // White text for contrast
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    helperText: {
        color: Colors.textSecondary,
        fontSize: 12,
        textAlign: 'right',
        marginTop: 8,
        marginRight: 4,
    }
});
