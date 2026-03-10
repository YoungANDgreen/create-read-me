import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { colors } from '@/lib/theme';

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.textPrimary,
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: colors.background },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="games/grid"
          options={{ title: 'The Grid', presentation: 'card' }}
        />
        <Stack.Screen
          name="games/stat-stack"
          options={{ title: 'Stat Stack', presentation: 'card' }}
        />
        <Stack.Screen
          name="games/clash"
          options={{ title: 'Conference Clash', presentation: 'card' }}
        />
        <Stack.Screen
          name="games/dynasty"
          options={{ title: 'Dynasty Builder', presentation: 'card' }}
        />
        <Stack.Screen
          name="games/predictions"
          options={{ title: 'Prediction Arena', presentation: 'card' }}
        />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
