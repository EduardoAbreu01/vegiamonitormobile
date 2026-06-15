import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function SideMenu({ visible, onClose }) {
    const { usuario, logout } = useAuth();
    
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);

    const executeLogout = () => {
        setShowLogoutPopup(false); 
        logout(); 
        onClose();
        router.replace('/login'); 
    };

    return (
        <>
            <Modal 
                visible={visible} 
                transparent={true} 
                animationType="fade" 
            >
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback onPress={onClose}>
                        <View style={styles.closeArea} />
                    </TouchableWithoutFeedback>
                    
                    <View style={styles.menuContainer}>
                        <View style={styles.profileSection}>
                            <Text style={styles.title}>VegiaMonitor</Text>
                            <Text style={styles.subtitle}>FIAP + Motiva</Text>
                            
                            <Image 
                                source={{ uri: usuario?.foto || '11' }} 
                                style={styles.avatar} 
                            />
                            
                            <Text style={styles.name}>{usuario?.nome || 'Usuário'}</Text>
                            <Text style={styles.role}>{usuario?.cargo || 'Cargo'}</Text>
                        </View>

                        <View style={styles.optionsSection}>
                            <TouchableOpacity style={styles.optionButton} onPress={() => router.replace('/notificacoes')}>
                                <Text style={styles.optionText}>Notificações</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={styles.optionButton} onPress={() => setShowLogoutPopup(true)}>
                                <Text style={styles.optionText}>Sair</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                visible={showLogoutPopup}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.popupOverlay}>
                    
                    <View style={styles.popupBox}>
                        <Text style={styles.popupText}>deseja realmente sair?</Text>
                        
                        <View style={styles.popupButtonsContainer}>
                            <TouchableOpacity style={styles.btnSim} onPress={executeLogout}>
                                <Text style={styles.btnText}>sim</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btnNao} onPress={() => setShowLogoutPopup(false)}>
                                <Text style={styles.btnText}>não</Text>
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
        backgroundColor: 'rgba(0,0,0,0.6)', 
    },
    closeArea: {
        ...StyleSheet.absoluteFillObject, 
        zIndex: 1, 
    },
    menuContainer: {
        width: '65%', 
        maxWidth: 250, 
        backgroundColor: '#1E1E1E',
        height: '100%',
        zIndex: 2, 
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: -5, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    profileSection: {
        backgroundColor: '#612BFF',
        paddingVertical: 35,
        alignItems: 'center',
    },
    title: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#D3C4FF',
        fontSize: 12,
        marginBottom: 15,
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginBottom: 10,
    },
    name: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
    role: {
        color: '#D3C4FF',
        fontSize: 12,
    },
    optionsSection: {
        flex: 1,
        backgroundColor: '#202020',
        paddingTop: 30,
        alignItems: 'center',
    },
    optionButton: {
        marginBottom: 20,
    },
    optionText: {
        color: '#FF1453',
        fontSize: 18,
        fontWeight: 'bold',
    },
    popupOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)', 
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    popupBox: {
        backgroundColor: '#2C2C2C',
        paddingVertical: 30,
        paddingHorizontal: 25,
        borderRadius: 20,
        width: '80%',
        maxWidth: 320,
        alignItems: 'center',
    },
    popupText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 25,
        textAlign: 'center',
    },
    popupButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
    },
    btnSim: {
        backgroundColor: '#FF1453', 
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        minWidth: 100,
        alignItems: 'center',
    },
    btnNao: {
        backgroundColor: '#612BFF',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        minWidth: 100,
        alignItems: 'center',
    },
    btnText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    }
});