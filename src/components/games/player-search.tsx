import React, { useState, useCallback } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { colors, spacing, typography, borderRadius } from '@/lib/theme';
import type { Player } from '@/types';

interface PlayerSearchProps {
  onSelectPlayer: (player: Player) => void;
  placeholder?: string;
}

// Mock search function — will be replaced with CFBD API integration
function mockSearchPlayers(query: string): Player[] {
  if (query.length < 2) return [];

  const MOCK_PLAYERS: Player[] = [
    { id: '1', name: 'Derrick Henry', position: 'RB', school: 'Alabama', conference: 'SEC', seasons: [], awards: ['Heisman'] },
    { id: '2', name: 'Joe Burrow', position: 'QB', school: 'LSU', conference: 'SEC', seasons: [], awards: ['Heisman'] },
    { id: '3', name: 'DeVonta Smith', position: 'WR', school: 'Alabama', conference: 'SEC', seasons: [], awards: ['Heisman', 'Biletnikoff'] },
    { id: '4', name: 'Lamar Jackson', position: 'QB', school: 'Louisville', conference: 'ACC', seasons: [], awards: ['Heisman'] },
    { id: '5', name: 'Saquon Barkley', position: 'RB', school: 'Penn State', conference: 'Big Ten', seasons: [], awards: [] },
    { id: '6', name: 'Chase Young', position: 'DL', school: 'Ohio State', conference: 'Big Ten', seasons: [], awards: [] },
    { id: '7', name: 'Trevor Lawrence', position: 'QB', school: 'Clemson', conference: 'ACC', seasons: [], awards: [] },
    { id: '8', name: 'Justin Fields', position: 'QB', school: 'Ohio State', conference: 'Big Ten', seasons: [], awards: [] },
    { id: '9', name: 'CeeDee Lamb', position: 'WR', school: 'Oklahoma', conference: 'Big 12', seasons: [], awards: ['Biletnikoff'] },
    { id: '10', name: 'Ja\'Marr Chase', position: 'WR', school: 'LSU', conference: 'SEC', seasons: [], awards: ['Biletnikoff'] },
    { id: '11', name: 'Micah Parsons', position: 'LB', school: 'Penn State', conference: 'Big Ten', seasons: [], awards: ['Butkus'] },
    { id: '12', name: 'Caleb Williams', position: 'QB', school: 'USC', conference: 'Pac-12', seasons: [], awards: ['Heisman'] },
    { id: '13', name: 'Brock Bowers', position: 'TE', school: 'Georgia', conference: 'SEC', seasons: [], awards: [] },
    { id: '14', name: 'Will Anderson Jr.', position: 'DL', school: 'Alabama', conference: 'SEC', seasons: [], awards: ['Nagurski'] },
    { id: '15', name: 'C.J. Stroud', position: 'QB', school: 'Ohio State', conference: 'Big Ten', seasons: [], awards: [] },
  ];

  const lower = query.toLowerCase();
  return MOCK_PLAYERS.filter(p =>
    p.name.toLowerCase().includes(lower) ||
    p.school.toLowerCase().includes(lower) ||
    p.position.toLowerCase().includes(lower)
  ).slice(0, 8);
}

export function PlayerSearch({ onSelectPlayer, placeholder = 'Search players...' }: PlayerSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Player[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useCallback((text: string) => {
    setQuery(text);
    if (text.length < 2) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    // Simulate async search — replace with real API call
    setTimeout(() => {
      const found = mockSearchPlayers(text);
      setResults(found);
      setIsSearching(false);
    }, 150);
  }, []);

  const handleSelect = (player: Player) => {
    onSelectPlayer(player);
    setQuery('');
    setResults([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.searchIcon}>&#x1F50D;</Text>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={handleSearch}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          autoCapitalize="words"
          autoCorrect={false}
        />
        {isSearching && <ActivityIndicator color={colors.accent} size="small" />}
      </View>

      {results.length > 0 && (
        <View style={styles.resultsContainer}>
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.resultItem}
                onPress={() => handleSelect(item)}
                activeOpacity={0.7}
              >
                <View style={styles.resultContent}>
                  <Text style={styles.playerName}>{item.name}</Text>
                  <View style={styles.playerMeta}>
                    <Text style={styles.positionBadge}>{item.position}</Text>
                    <Text style={styles.schoolText}>{item.school}</Text>
                    <Text style={styles.confText}>{item.conference}</Text>
                  </View>
                </View>
                {item.awards.length > 0 && (
                  <Text style={styles.awardBadge}>
                    {item.awards[0]}
                  </Text>
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    height: 44,
    color: colors.textPrimary,
    fontSize: typography.fontSize.md,
  },
  resultsContainer: {
    position: 'absolute',
    top: 48,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    maxHeight: 300,
    overflow: 'hidden',
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  resultContent: {
    flex: 1,
  },
  playerName: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
  },
  playerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: spacing.sm,
  },
  positionBadge: {
    color: colors.accent,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    backgroundColor: colors.surfaceHighlight,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },
  schoolText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
  },
  confText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.xs,
  },
  awardBadge: {
    color: colors.accent,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    backgroundColor: 'rgba(226, 183, 20, 0.15)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
});
