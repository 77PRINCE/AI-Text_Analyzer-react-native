import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    Easing
} from 'react-native-reanimated';

// Background colors to cycle through (Light Green/Mint variants)
const COLORS = [
    ['#F0FDF4', '#DCFCE7'], // Mint/Light Emerald
    ['#F0FDF4', '#F9FAF9'], // Lightest Green/White
    ['#DCFCE7', '#F0FDF4'], // Reversed
    ['#F0FDF4', '#ECFDF5'], // Hints of Teal
];

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function AnimatedBackground({ children }) {
    const opacity1 = useSharedValue(1);
    const opacity2 = useSharedValue(0);

    useEffect(() => {
        opacity1.value = withRepeat(
            withTiming(0, { duration: 10000, easing: Easing.linear }),
            -1,
            true
        );
        opacity2.value = withRepeat(
            withTiming(1, { duration: 10000, easing: Easing.linear }),
            -1,
            true
        );
    }, []);

    const style1 = useAnimatedStyle(() => ({ opacity: opacity1.value }));
    const style2 = useAnimatedStyle(() => ({ opacity: opacity2.value }));

    return (
        <View style={styles.container}>
            <AnimatedLinearGradient
                colors={['#F0FDF4', '#DCFCE7']}
                style={[StyleSheet.absoluteFill, style1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />
            <AnimatedLinearGradient
                colors={['#DCFCE7', '#ECFDF5']} // Mint shades
                style={[StyleSheet.absoluteFill, style2]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0FDF4', // Fallback
    },
});
