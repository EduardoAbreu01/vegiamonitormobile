import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableOpacity, 
    Linking, 
    ScrollView, 
    StatusBar, 
    Platform 
} from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome, Feather, Ionicons } from '@expo/vector-icons'; 
import { router } from 'expo-router';
import Header from "../../components/header";
import { useAuth } from "../../context/AuthContext";

export default function Perfil() {
    const { usuario, logout } = useAuth();
    const insets = useSafeAreaInsets();

    const handleContactarGestor = () => {
        const numero = usuario?.contatoGestor || "5511999999999"; 
        Linking.openURL(`https://wa.me/${numero}`);
    };

    const handleLogout = () => {
        if (logout) logout();
        router.replace('/login');
    };

    return (
        <View style={[styles.mainContainer, { paddingTop: Platform.OS === 'ios' ? insets.top : 0 }]}>
            <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
            <Header />
            
            <ScrollView contentContainerStyle={styles.containerRolavel} showsVerticalScrollIndicator={false}>
                
                {/* Header do Perfil (Alto Contraste) */}
                <View style={styles.profileHeaderCard}>
                    <Image
                        source={{ 
                            uri: usuario?.foto && usuario.foto.startsWith('http') 
                                ? usuario.foto 
                                : 'https://via.placeholder.com/150/FFFFFF/612BFF?text=User' 
                        }}
                        style={styles.avatar}
                    />
                    <Text style={styles.nomeUsuario}>{usuario?.nome || 'Usuário'}</Text>
                    <View style={styles.badgeCargo}>
                        <Text style={styles.textoCargo}>{usuario?.cargo || 'Operador de Campo'}</Text>
                    </View>
                </View>

                {/* Card de Informações da Conta */}
                <View style={styles.infoCard}>
                    <Text style={styles.cardTitle}>Informações Operacionais</Text>

                    <View style={styles.infoRow}>
                        <View style={styles.iconBox}>
                            <Feather name="user" size={18} color="#612BFF" />
                        </View>
                        <View style={styles.infoTextGroup}>
                            <Text style={styles.infoLabel}>Nome Completo</Text>
                            <Text style={styles.infoValue}>{usuario?.nome || 'Não informado'}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                        <View style={styles.iconBox}>
                            <Feather name="users" size={18} color="#612BFF" />
                        </View>
                        <View style={styles.infoTextGroup}>
                            <Text style={styles.infoLabel}>Equipe Designada</Text>
                            <Text style={styles.infoValue}>{usuario?.equipe || 'Não informada'}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                        <View style={styles.iconBox}>
                            <Feather name="briefcase" size={18} color="#612BFF" />
                        </View>
                        <View style={styles.infoTextGroup}>
                            <Text style={styles.infoLabel}>Função Atual</Text>
                            <Text style={styles.infoValue}>{usuario?.cargo || 'Não informada'}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity style={styles.whatsappBtn} onPress={handleContactarGestor} activeOpacity={0.85}>
                        <FontAwesome name="whatsapp" size={22} color="#FFFFFF" marginLeft="10" />
                        <Text style={styles.whatsappBtnText}>CONTACTAR GESTOR</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    containerRolavel: {
        padding: 16,
        paddingBottom: 40,
    },
    profileHeaderCard: {
        alignItems: 'center',
        backgroundColor: '#612BFF',
        borderRadius: 20,
        paddingVertical: 30,
        paddingHorizontal: 16,
        marginBottom: 16,
        elevation: 6,
        shadowColor: '#612BFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: '#FFFFFF',
        marginBottom: 16,
        backgroundColor: '#FFFFFF',
    },
    nomeUsuario: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    badgeCargo: {
        backgroundColor: '#FFEA00',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        marginTop: 8,
    },
    textoCargo: {
        color: '#000000',
        fontSize: 13,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    infoCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    cardTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#64748B',
        marginBottom: 16,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    iconBox: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    infoTextGroup: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '600',
        marginBottom: 2,
    },
    infoValue: {
        fontSize: 16,
        color: '#0F172A',
        fontWeight: 'bold',
    },
    divider: {
        height: 1,
        backgroundColor: '#E2E8F0',
        marginVertical: 8,
    },
    actionButtonsContainer: {
        gap: 12,
    },
    whatsappBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#25D366',
        borderRadius: 14,
        paddingVertical: 16,
        elevation: 2,
        shadowColor: '#25D366',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    whatsappBtnText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 10,
        letterSpacing: 0.5,
    },
});