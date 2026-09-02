import React from 'react';
import { Platform, StyleSheet, useColorScheme, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { Tabs } from 'expo-router';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { SymbolView } from 'expo-symbols';

// IMPORTANT: iOS 26 uses NativeTabs for native tabs with liquid glass support.
// NativeTabs intentionally does NOT use custom design tokens — liquid glass
// is a system-level appearance provided by iOS and cannot be overridden.
// Custom brand colors are applied only on the ClassicTabLayout path (older iOS / Android / web).
function NativeTabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Icon sf={{ default: 'house', selected: 'house.fill' }} />
        <NativeTabs.Trigger.Label>Ringkasan</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="production">
        <NativeTabs.Trigger.Icon sf={{ default: 'chart.bar', selected: 'chart.bar.fill' }} />
        <NativeTabs.Trigger.Label>Produksi</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="quality">
        <NativeTabs.Trigger.Icon sf={{ default: 'checkmark.shield', selected: 'checkmark.shield.fill' }} />
        <NativeTabs.Trigger.Label>Kualitas</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="safety">
        <NativeTabs.Trigger.Icon sf={{ default: 'exclamationmark.shield', selected: 'exclamationmark.shield.fill' }} />
        <NativeTabs.Trigger.Label>Aman</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="agents">
        <NativeTabs.Trigger.Icon sf={{ default: 'sparkles', selected: 'sparkles' }} />
        <NativeTabs.Trigger.Label>Agen</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

function ClassicTabLayout() {
  const colors = useColors();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const isIOS = Platform.OS === 'ios';
  const isWeb = Platform.OS === 'web';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedForeground,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: isIOS ? 'transparent' : colors.background,
          borderTopWidth: isWeb ? 1 : 0,
          borderTopColor: colors.border,
          elevation: 0,
          ...(isWeb ? { height: 84 } : {}),
        },
        tabBarBackground: () =>
          isIOS ? (
            <BlurView
              intensity={100}
              tint={isDark ? 'dark' : 'light'}
              style={StyleSheet.absoluteFill}
            />
          ) : isWeb ? (
            <View
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: colors.background },
              ]}
            />
          ) : null,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ringkasan',
          tabBarIcon: ({ color }) =>
            isIOS ? (
              <SymbolView name="house" tintColor={color} size={24} />
            ) : (
              <Feather name="home" size={22} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="production"
        options={{
          title: 'Produksi',
          tabBarIcon: ({ color }) => <Feather name="bar-chart-2" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="quality"
        options={{
          title: 'Kualitas',
          tabBarIcon: ({ color }) => <Feather name="check-circle" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="safety"
        options={{
          title: 'Aman',
          tabBarIcon: ({ color }) => <Feather name="shield" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="agents"
        options={{
          title: 'Agen',
          tabBarIcon: ({ color }) => <Feather name="zap" size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  if (isLiquidGlassAvailable()) {
    return <NativeTabLayout />;
  }
  return <ClassicTabLayout />;
}
