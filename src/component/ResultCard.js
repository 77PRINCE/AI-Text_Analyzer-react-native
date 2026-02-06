import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from "../constants/colors";
import { sentimentMap } from "../utils/sentimentMap";
import { formatKeywords } from "../utils/keywordsUtils";

export default function ResultCard(props) {
  const { summary, sentiment, keywords, tone, action } = props;

  if (!summary) return null;

  const sentimentInfo = sentimentMap[sentiment] || sentimentMap.unknown;

  return (
    <View style={styles.card}>
      <View style={[styles.sentimentBadge, { backgroundColor: sentimentInfo.color + '20', borderColor: sentimentInfo.color }]}>
        <Text style={[styles.sentimentText, { color: sentimentInfo.color }]}>
          {sentimentInfo.label}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Summary</Text>
        <Text style={styles.bodyText}>{summary}</Text>
      </View>

      {/* Tone Section */}
      {tone && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tone</Text>
          <Text style={styles.bodyText}>{tone}</Text>
        </View>
      )}

      {/* Action Section */}
      {action && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended Action</Text>
          <Text style={[styles.bodyText, { fontStyle: 'italic', color: Colors.primary }]}>
            "{action}"
          </Text>
        </View>
      )}

      {/* NEW: Magic Rewrites Section */}
      {props.rewrites && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ Magic Rewrites</Text>

          <View style={styles.rewriteBox}>
            <Text style={styles.rewriteLabel}>💼 Professional:</Text>
            <Text style={styles.rewriteText}>"{props.rewrites.professional}"</Text>
          </View>

          <View style={[styles.rewriteBox, { marginTop: 12 }]}>
            <Text style={styles.rewriteLabel}>👶 Simplified:</Text>
            <Text style={styles.rewriteText}>"{props.rewrites.simplified}"</Text>
          </View>
        </View>
      )}

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Concepts</Text>
        <View style={styles.keywordContainer}>
          {Array.isArray(keywords) && keywords.map((keyword, index) => (
            <View key={index} style={styles.keywordBadge}>
              <Text style={styles.keywordText}>{keyword}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 24,
    ...Colors.shadow,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sentimentBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 20,
  },
  sentimentText: {
    fontWeight: '700',
    fontSize: 14,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 26,
    color: Colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 16,
  },
  keywordContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  keywordBadge: {
    backgroundColor: Colors.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  keywordText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  rewriteBox: {
    backgroundColor: Colors.background,
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  rewriteLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  rewriteText: {
    fontSize: 15,
    color: Colors.text,
    fontStyle: 'italic',
    lineHeight: 22,
  },
});
