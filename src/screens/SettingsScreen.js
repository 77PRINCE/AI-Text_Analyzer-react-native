import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import Colors from '../constants/colors';

export default function SettingsScreen() {
    const [isDarkMode, setIsDarkMode] = React.useState(true);
    const [notifications, setNotifications] = React.useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>

            <View style={styles.settingItem}>
                <Text style={styles.settingText}>Dark Mode</Text>
                <Switch
                    value={isDarkMode}
                    onValueChange={setIsDarkMode}
                    trackColor={{ false: "#767577", true: Colors.primary }}
                    thumbColor={isDarkMode ? "#fff" : "#f4f3f4"}
                />
            </View>

            <View style={styles.settingItem}>
                <Text style={styles.settingText}>Enable Notifications</Text>
                <Switch
                    value={notifications}
                    onValueChange={setNotifications}
                    trackColor={{ false: "#767577", true: Colors.primary }}
                    thumbColor={notifications ? "#fff" : "#f4f3f4"}
                />
            </View>

            <View style={styles.infoBox}>
                <Text style={styles.infoText}>More settings coming soon!</Text>
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
        marginBottom: 32,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        backgroundColor: Colors.surface,
        padding: 16,
        borderRadius: 12,
    },
    settingText: {
        fontSize: 18,
        color: Colors.text,
    },
    infoBox: {
        marginTop: 40,
        alignItems: 'center',
    },
    infoText: {
        color: Colors.textSecondary,
        fontStyle: 'italic',
    }
});
