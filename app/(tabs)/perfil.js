import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, Linking } from "react-native";
import { FontAwesome } from '@expo/vector-icons'; 
import Header from "../../components/header";
import { useAuth } from "../../context/AuthContext";

export default function Perfil() {
    const { usuario } = useAuth();

    const handleContactarGestor = () => {
        const numero = usuario?.contatoGestor || "5511999999999"; 
        Linking.openURL(`https://wa.me/${numero}`);
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Header />
            
            <View style={styles.container}>
                <Text style={styles.titulo}>Olá, {usuario?.nome || 'Usuário'}</Text>

                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: usuario?.foto || 'https://via.placeholder.com/150' }}
                        style={styles.profileImage}
                    />
                </View>

                <View style={styles.formContainer}>
                    
                    <Text style={styles.label}>Nome</Text>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoText}>{usuario?.nome}</Text>
                    </View>

                    <Text style={styles.label}>Equipe</Text>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoText}>{usuario?.equipe}</Text>
                    </View>

                    <Text style={styles.label}>Cargo Atual</Text>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoText}>{usuario?.cargo}</Text>
                    </View>

                    <TouchableOpacity style={styles.whatsappButton} onPress={handleContactarGestor} activeOpacity={0.7}>
                        <FontAwesome name="whatsapp" size={32} color="#25D366" />
                        <Text style={styles.whatsappText}>contactar gestor</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F6F6FC', 
    },
    container: {
        flex: 1,
        paddingHorizontal: 40,
        paddingTop: 10,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 25,
        textAlign: 'center',
        color: '#FF1453', 
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 35,
    },
    profileImage: {
        width: 140,
        height: 140,
        borderRadius: 70, 
    },
    formContainer: {
        width: '100%',
    },
    label: {
        color: '#8A8A8A', 
        marginBottom: 8,
        marginLeft: 15, 
        fontSize: 16,
        fontWeight: '600',
    },
    infoBox: {
        height: 50,
        backgroundColor: '#FFFFFF', 
        borderRadius: 25, 
        paddingHorizontal: 20,
        marginBottom: 20,
        justifyContent: 'center',
        elevation: 2, 
    },
    infoText: {
        color: '#666666', 
        fontWeight: '500',
    },
    whatsappButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 5,
    },
    whatsappText: {
        color: '#8A8A8A',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 10,
    }
});