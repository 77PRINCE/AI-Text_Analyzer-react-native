import 'react-native-gesture-handler';
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import HomeScreen from './src/screens/HomeScreen';
import AboutScreen from './src/screens/AboutScreen';
import ContactScreen from './src/screens/ContactScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import Colors from './src/constants/colors';

const Drawer = createDrawerNavigator();

// Custom Header Component
const CustomHeader = ({ navigation }) => (
  <LinearGradient
    colors={['#38BDF8', '#818CF8']} // "Gradient Light Blue" (Sky to Indigo)
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={styles.headerGradient}
  >
    <View style={styles.headerContent}>
      {/* Left: Hamburger Menu */}
      <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.iconButton}>
        <Ionicons name="menu" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Right: Import Icon (Empty for now) */}
      <TouchableOpacity onPress={() => console.log('Import pressed')} style={styles.iconButton}>
        <Ionicons name="cloud-upload-outline" size={26} color="#fff" />
      </TouchableOpacity>
    </View>
  </LinearGradient>
);

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Drawer.Navigator
        screenOptions={({ navigation }) => ({
          header: () => <CustomHeader navigation={navigation} />,
          drawerStyle: {
            backgroundColor: Colors.surface,
            width: 260,
          },
          drawerActiveTintColor: Colors.primary,
          drawerInactiveTintColor: Colors.textSecondary,
          sceneContainerStyle: {
            backgroundColor: Colors.background,
          }
        })}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Analysis Tool' }}
        />
        <Drawer.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Settings' }}
        />
        <Drawer.Screen
          name="About"
          component={AboutScreen}
          options={{ title: 'About App' }}
        />
        <Drawer.Screen
          name="Contact"
          component={ContactScreen}
          options={{ title: 'Contact Us' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerGradient: {
    height: 100, // Adjust based on SafeArea
    paddingTop: 40, // Space for status bar
    justifyContent: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
  }
});
