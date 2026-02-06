import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import TextInputBox from "../component/TextInputBox";
import AnalyzeButton from "../component/AnalyzeButton";
import ResultCard from "../component/ResultCard";
import AnimatedBackground from "../component/AnimatedBackground";
import { analyzeText } from "../services/aiService";
import Colors from "../constants/colors";
import { validateText } from "../utils/validateText";

const { height } = Dimensions.get('window');

export default function HomeScreen() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleClear = () => {
    setText('');
    setResults(null);
    setError('');
  };

  const handleAnalyze = async () => {
    const errorMessage = validateText(text);
    if (errorMessage) {
      setError(errorMessage);
      return;
    }
    setError('');
    setLoading(true);
    setResults(null);

    try {
      const result = await analyzeText(text);
      setResults(result);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedBackground>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* LOGO SECTION */}
          <Animated.View
            entering={FadeInDown.delay(100).springify()}
            style={styles.logoContainer}
          >
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(200).springify()}>
            <Text style={styles.headerTitle}>AI Text Analyzer</Text>
            <Text style={styles.headerSubtitle}>Evaluate sentiment & key insights instantly</Text>
          </Animated.View>

          <Animated.View
            style={styles.inputContainer}
            entering={FadeInDown.delay(300).springify()}
          >
            <TextInputBox
              value={text}
              onChange={setText}
              onClear={handleClear}
            />
          </Animated.View>

          <Animated.View
            style={styles.buttonContainer}
            entering={FadeInDown.delay(400).springify()}
          >
            <AnalyzeButton onPress={handleAnalyze} loading={loading} />
          </Animated.View>

          {error ? (
            <Animated.View
              entering={FadeInUp.springify()}
              style={styles.errorContainer}
            >
              <Text style={styles.errorText}>⚠️ {error}</Text>
            </Animated.View>
          ) : null}

          {results && (
            <Animated.View
              entering={FadeInDown.springify().damping(12)}
              style={styles.resultsContainer}
            >
              <ResultCard
                summary={results.summary}
                sentiment={results.sentiment}
                keywords={results.keywords}
                tone={results.tone}
                action={results.action}
              />
            </Animated.View>
          )}
        </ScrollView>
      </SafeAreaView>
    </AnimatedBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Background is handled by AnimatedBackground
  },
  scrollContent: {
    padding: 24,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    minHeight: height, // Ensure full height for centering if needed, though we prefer top-down now
    paddingTop: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 160,
    height: 160,
    borderRadius: 32,
    // Add subtle shadow/glow if valid PNG
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 1,
    textShadowColor: 'rgba(5, 150, 105, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
    paddingHorizontal: 20,
    textShadowColor: 'rgba(5, 150, 105, 0.1)',
    textShadowRadius: 1,
  },
  inputContainer: {
    marginBottom: 16,
    position: 'relative', // Context for clear button
  },
  buttonContainer: {
    marginBottom: 16,
    zIndex: 10,
  },
  errorContainer: {
    backgroundColor: '#FEF2F2', // Very light red
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    marginBottom: 24,
  },
  errorText: {
    color: '#B91C1C', // Strong red
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
  resultsContainer: {
    width: '100%',
    marginBottom: 40,
  }
});
