import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NotificacaoCard({ notificacao }) {
    return (
        <View style={[styles.cartao, { borderTopColor: notificacao.color }]}>
            
            <View style={styles.conteinerIcone}>
                <Ionicons 
                    name={notificacao.icone} 
                    size={40} 
                    color={notificacao.color} 
                />
            </View>
            <View style={styles.conteudoCartao}>
                <Text style={styles.tituloCartao}>{notificacao.titulo}</Text>
                <Text style={styles.descricaoCartao}>{notificacao.descricao}</Text>
                <Text style={styles.dataHoraCartao}>{notificacao.data} {notificacao.hora}</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    cartao: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        borderTopWidth: 4, 
        borderWidth: 1,
        borderColor: '#EAEAEA',
        elevation: 3,
    },
    conteinerIcone: {
        width: 50,
        alignItems: 'center',
        marginRight: 15,
        marginTop: 5,
    },
    conteudoCartao: {
        flex: 1,
        justifyContent: 'center',
    },
    tituloCartao: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#8A8A8A', 
        marginBottom: 4,
    },
    descricaoCartao: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 10,
        lineHeight: 18,
    },
    dataHoraCartao: {
        fontSize: 11,
        color: '#A0A0A0', 
        fontWeight: '600',
    }
});