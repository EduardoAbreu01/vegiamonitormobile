import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function IndexScreen() {
    const { usuario, carregando } = useAuth();

    useEffect(() => {
        if (!carregando) {
            if (usuario) {
                // Se já existir sessão salva (offline ou online), vai direto para o cronograma
                router.replace('/cronograma');
            } else {
                // Se não houver sessão, manda para o login
                router.replace('/login');
            }
        }
    }, [usuario, carregando]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#612BFF' }}>
            <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
    );
}