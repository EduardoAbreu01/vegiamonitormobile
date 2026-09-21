import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Modal, 
    TouchableOpacity, 
    TouchableWithoutFeedback, 
    Image,
    Platform
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';

export default function SideMenu({ visible, onClose }) {
    const { usuario, logout } = useAuth();
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    const insets = useSafeAreaInsets();

    const executeLogout = () => {
        setShowLogoutPopup(false); 
        logout(); 
        onClose();
        router.replace('/login'); 
    };

    return (
        <>
            {/* Modal do Menu Lateral */}
            <Modal 
                visible={visible} 
                transparent={true} 
                animationType="fade" 
                onRequestClose={onClose}
            >
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback onPress={onClose}>
                        <View style={styles.closeArea} />
                    </TouchableWithoutFeedback>
                    
                    <View style={styles.menuContainer}>
                        {/* Seção do Perfil com Área Segura Dinâmica */}
                        <View style={[styles.profileSection, { paddingTop: Math.max(insets.top + 20, 40) }]}>
                            <Text style={styles.title}>VegiaMonitor</Text>
                            <Text style={styles.subtitle}>FIAP + Motiva</Text>

                            <Image 
                                source={{ 
                                    uri: usuario?.foto && usuario.foto.startsWith('http') 
                                        ? usuario.foto 
                                        : 'https://via.placeholder.com/150/FFFFFF/612BFF?text=User' 
                                }} 
                                style={styles.avatar} 
                            />
                            
                            <Text style={styles.name}>{usuario?.nome || 'Usuário'}</Text>
                            <Text style={styles.role}>{usuario?.cargo || 'Operador'}</Text>
                        </View>

                        {/* Opções de Navegação */}
                        <View style={styles.optionsSection}>
                            <TouchableOpacity 
                                style={styles.optionButton} 
                                onPress={() => { onClose(); router.push('/notificacoes'); }}
                                activeOpacity={0.8}
                            >
                                <View style={styles.iconBox}>
                                    <Ionicons name="notifications" size={20} color="#612BFF" />
                                </View>
                                <Text style={styles.optionText}>Notificações</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[styles.optionButton, styles.logoutButton]} 
                                onPress={() => setShowLogoutPopup(true)}
                                activeOpacity={0.8}
                            >
                                <View style={[styles.iconBox, { backgroundColor: '#FFF0F2' }]}>
                                    <Ionicons name="log-out" size={20} color="#FF1453" />
                                </View>
                                <Text style={[styles.optionText, styles.logoutText]}>Sair da Conta</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Modal Pop-up de Confirmação de Logout */}
            <Modal
                visible={showLogoutPopup}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowLogoutPopup(false)}
            >
                <View style={styles.popupOverlay}>
                    <View style={styles.popupBox}>
                        <View style={styles.popupIconWrapper}>
                            <Ionicons name="warning" size={32} color="#FF1453" />
                        </View>
                        
                        <Text style={styles.popupTitle}>Encerrar Sessão?</Text>
                        <Text style={styles.popupSubtitle}>Você precisará fazer login novamente para acessar o sistema.</Text>
                        
                        <View style={styles.popupButtonsContainer}>
                            <TouchableOpacity 
                                style={styles.btnNao} 
                                onPress={() => setShowLogoutPopup(false)}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.btnNaoText}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={styles.btnSim} 
                                onPress={executeLogout}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.btnSimText}>Sair</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end', 
        backgroundColor: 'rgba(15, 23, 42, 0.6)', // Fundo escuro levemente azulado para contraste
    },
    closeArea: {
        flex: 1,
    },
    menuContainer: {
        width: '75%', 
        maxWidth: 300, 
        backgroundColor: '#F8FAFC',
        height: '100%',
        zIndex: 2, 
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: -4, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
    },
    profileSection: {
        backgroundColor: '#612BFF',
        paddingBottom: 35,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderBottomLeftRadius: 20,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    subtitle: {
        color: '#FFEA00',
        fontSize: 12,
        fontWeight: '700',
        marginBottom: 20,
        textTransform: 'uppercase',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 12,
        borderWidth: 3,
        borderColor: '#FFFFFF',
        backgroundColor: '#FFFFFF',
    },
    name: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    role: {
        color: '#D3C4FF',
        fontSize: 13,
        fontWeight: '600',
        marginTop: 2,
    },
    optionsSection: {
        flex: 1,
        paddingTop: 25,
        paddingHorizontal: 20,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        marginBottom: 10,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#F3E8FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionText: {
        color: '#0F172A',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 14,
    },
    logoutButton: {
        marginTop: 'auto',
        marginBottom: Platform.OS === 'ios' ? 40 : 25,
    },
    logoutText: {
        color: '#FF1453',
    },
    
    /* MODAL DE LOGOUT REDESENHADO */
    popupOverlay: {
        flex: 1,
        backgroundColor: 'rgba(15, 23, 42, 0.7)', 
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    popupBox: {
        backgroundColor: '#FFFFFF',
        paddingTop: 30,
        paddingBottom: 24,
        paddingHorizontal: 24,
        borderRadius: 24,
        width: '100%',
        maxWidth: 340,
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
    },
    popupIconWrapper: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#FFF0F2',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    popupTitle: {
        color: '#0F172A',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    popupSubtitle: {
        color: '#64748B',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 20,
    },
    popupButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 12,
    },
    btnNao: {
        flex: 1,
        backgroundColor: '#F1F5F9',
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
    },
    btnNaoText: {
        color: '#475569',
        fontSize: 15,
        fontWeight: 'bold',
    },
    btnSim: {
        flex: 1,
        backgroundColor: '#FF1453', 
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#FF1453',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    btnSimText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold',
    }
});