import { Tabs } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#E83D84',headerShown: false  }}>
      <Tabs.Screen
        name="cronograma"
        options={{
          title: 'Cronograma',
          headerStyle: { backgroundColor: '#F6F6FC' },
          headerTintColor: '#E83D84',
          tabBarStyle: { backgroundColor: '#612BFF' },
          tabBarIcon: ({ color }) => <Fontisto name="date" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="rodovia"
        options={{
          title: 'Rodovia',
          headerStyle: { backgroundColor: '#F6F6FC' },
          headerTintColor: '#E83D84',
          tabBarStyle: { backgroundColor: '#612BFF' },
          tabBarIcon: ({ color }) => <FontAwesome5 name="road" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          headerStyle: { backgroundColor: '#F6F6FC' },
          headerTintColor: '#E83D84',
          tabBarStyle: { backgroundColor: '#612BFF' },
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}