import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import notificacoesDB from '../data/notificacoes.json';
import NotificacaoCard from '../components/notificacao.js';

export default function NotificacoesScreen() {    
    return (
        <SafeAreaView style={styles.conteinerPrincipal}>
            <StatusBar barStyle="light-content" backgroundColor="#612BFF" />

            <View style={styles.cabecalho}>
                <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.replace('cronograma')}>
                    <Ionicons name="arrow-undo" size={32} color="#000000" />
                </TouchableOpacity>

                <View style={styles.conteinerIdentificacao}>
                    <View style={styles.avatar}>
                        <Text style={styles.textoAvatar}>M</Text>
                    </View>
                    <View style={styles.textosCabecalho}>
                        <Text style={styles.tituloCabecalho}>VegiaMonitor</Text>
                        <Text style={styles.subtituloCabecalho}>FIAP + Motiva</Text>
                    </View>
                </View>
            </View>

            <FlatList
                data={notificacoesDB}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <NotificacaoCard notificacao={item} />}
                contentContainerStyle={styles.listaNotificacoes}
                showsVerticalScrollIndicator={false}
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    conteinerPrincipal: {
        flex: 1,
        backgroundColor: '#F6F6FC',
    },
    cabecalho: {
        backgroundColor: '#612BFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 25,
    },
    botaoVoltar: {
        marginRight: 25,
    },
    conteinerIdentificacao: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    textoAvatar: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#612BFF',
    },
    textosCabecalho: {
        justifyContent: 'center',
    },
    tituloCabecalho: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    subtituloCabecalho: {
        fontSize: 12,
        color: '#D4C4FF',
        fontWeight: '500',
    },
    listaNotificacoes: {
        padding: 20,
    }
});