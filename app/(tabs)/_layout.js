import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome5, Fontisto, Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FFEA00', 
        tabBarInactiveTintColor: '#FFFFFF', 
        tabBarStyle: {
          backgroundColor: '#612BFF', 
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.25,
          shadowRadius: 5,
          height: 60 + (insets.bottom > 0 ? insets.bottom : 10),
          paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          marginTop: 2,
        },
        tabBarItemStyle: {
          justify: 'center',
          alignItems: 'center',
        },
      }}
    >
      <Tabs.Screen
        name="cronograma"
        options={{
          title: 'Cronograma',
          tabBarIcon: ({ color }) => (
            <Fontisto name="date" size={20} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="rodovia"
        options={{
          title: 'Rodovia',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="road" size={20} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}