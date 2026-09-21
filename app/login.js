import React, { useState } from 'react';
import { router } from 'expo-router';
import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
    Image, 
    SafeAreaView, 
    StatusBar, 
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useAuth } from '../context/AuthContext'; 

export default function LoginScreen() {
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const { login, erro } = useAuth(); 

    const handleSubmeter = () => {
        const sucesso = login(cpf, senha);
        if (sucesso){
            router.replace('/cronograma');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#612BFF" />
            
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView 
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.keyboardContainer}
                >
                    <View style={styles.header}>
                        <View style={styles.avatarContainer}>
                            <Text style={styles.avatarTexto}>V</Text>
                        </View>
                        <View>
                            <Text style={styles.headerTitulo}>VegiaMonitor</Text>
                            <Text style={styles.headerSubTitulo}>FIAP + Motiva</Text>
                        </View>
                    </View>

                    <View style={styles.body}>
                        <Image 
                            style={styles.imagem}
                            resizeMode="contain"
                            source={require('../assets/imagemlogin.jpg')} 
                        />
                        
                        <View style={styles.formContainer}>
                            
                            <Text style={styles.inputLabel}>CPF do Colaborador</Text>
                            <View style={styles.inputWrapper}>
                                <Feather name="user" size={20} color="#64748B" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="000.000.000-00"
                                    placeholderTextColor="#94A3B8"
                                    keyboardType="numeric"
                                    value={cpf}
                                    onChangeText={setCpf}
                                />
                            </View>
                    
                            <Text style={styles.inputLabel}>Senha de Acesso</Text>
                            <View style={styles.inputWrapper}>
                                <Feather name="lock" size={20} color="#64748B" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Insira sua senha"
                                    placeholderTextColor="#94A3B8"
                                    secureTextEntry={!mostrarSenha}
                                    value={senha}
                                    onChangeText={setSenha}
                                />
                                <TouchableOpacity 
                                    style={styles.eyeIcon} 
                                    onPress={() => setMostrarSenha(!mostrarSenha)}
                                >
                                    <Feather name={mostrarSenha ? "eye" : "eye-off"} size={20} color="#64748B" />
                                </TouchableOpacity>
                            </View>

                            {erro ? (
                                <View style={styles.errorContainer}>
                                    <Feather name="alert-circle" size={16} color="#FF1453" />
                                    <Text style={styles.errorText}>{erro}</Text>
                                </View>
                            ) : null}

                            <TouchableOpacity 
                                style={styles.button} 
                                activeOpacity={0.85} 
                                onPress={handleSubmeter}
                            >
                                <Text style={styles.buttonText}>Acessar Sistema</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#612BFF', 
    },
    keyboardContainer: {
        flex: 1,
    },
    header: {
        backgroundColor: '#612BFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: Platform.OS === 'android' ? 50 : 20,
        paddingBottom: 40, 
    },
    avatarContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    avatarTexto: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#612BFF',
    },
    headerTitulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 2,
    },
    headerSubTitulo: {
        fontSize: 14,
        color: '#FFEA00', 
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    body: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        paddingHorizontal: 24,
        borderTopLeftRadius: 32, 
        borderTopRightRadius: 32,
    },
    imagem: {
        width: 220,
        height: 180,
        marginTop: 30,
        marginBottom: 30,
    },
    formContainer: {
        width: '100%',
    },
    inputLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: '#475569',
        marginBottom: 8,
        marginLeft: 4,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC', 
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginBottom: 20,
        paddingHorizontal: 16,
        height: 56,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#0F172A',
        fontWeight: '500',
        height: '100%',
    },
    eyeIcon: {
        padding: 8,
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF1F2',
        padding: 12,
        borderRadius: 12,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#FECDD3',
    },
    errorText: {
        color: '#FF1453',
        fontWeight: '600',
        fontSize: 14,
        marginLeft: 8,
    },
    button: {
        backgroundColor: '#612BFF',
        borderRadius: 16,
        paddingVertical: 18,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
        elevation: 4,
        shadowColor: '#612BFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
});