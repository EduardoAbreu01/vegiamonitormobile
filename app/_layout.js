import { useEffect } from 'react';
import { Stack } from 'expo-router';
import NetInfo from '@react-native-community/netinfo';
import { AuthProvider } from '../context/AuthContext'; 
import { sincronizarFilaOffline } from '../src/services/offlineQueue';

export default function RootLayout() {

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            if (state.isConnected && state.isInternetReachable) {
                sincronizarFilaOffline();
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="login" options={{ title: 'Login' }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> 
            </Stack>
        </AuthProvider>
    );
}