import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import NetInfo from '@react-native-community/netinfo';
import SideMenu from "./SideMenu";

export default function Header() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        // Monitora o estado da conexão em tempo real
        const unsubscribe = NetInfo.addEventListener(state => {
            const online = Boolean(state.isConnected && state.isInternetReachable !== false);
            setIsConnected(online);
        });

        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Text style={styles.texto}>M</Text>
                
                {/* Badge visível apenas quando estiver sem internet */}
                {!isConnected && (
                    <View style={styles.offlineBadge}>
                        <Ionicons name="cloud-offline-outline" size={14} color="#FF1453" style={{ marginRight: 4 }} />
                        <Text style={styles.offlineText}>Offline</Text>
                    </View>
                )}
            </View>

            <TouchableOpacity onPress={() => setMenuVisible(true)}>
                <Ionicons name="menu-outline" size={40} color="#000000" />
            </TouchableOpacity>

            <SideMenu 
                visible={menuVisible} 
                onClose={() => setMenuVisible(false)} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        height: 100,
        paddingLeft: 36,
        paddingRight: 36, 
        paddingTop: 36,
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center" 
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    texto: {
        fontSize: 48,
        color: "#612BFF",
        fontWeight: "bold",
        fontFamily: "Montserrat"
    },
    offlineBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF1F2',
        borderWidth: 1,
        borderColor: '#FECDD3',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    offlineText: {
        color: '#FF1453',
        fontSize: 12,
        fontWeight: 'bold',
    }
});