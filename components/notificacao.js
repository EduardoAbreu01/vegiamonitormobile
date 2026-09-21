import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NotificacaoCard({ notificacao }) {
    // Cor de destaque (usa o Roxo oficial como fallback)
    const cardColor = notificacao.color || '#612BFF';

    return (
        <View style={styles.cartao}>
            
            {/* Ícone com fundo suave baseado na cor da notificação */}
            <View style={[styles.iconWrapper, { backgroundColor: `${cardColor}1A` }]}>
                <Ionicons 
                    name={notificacao.icone || 'notifications-outline'} 
                    size={22} 
                    color={cardColor} 
                />
            </View>

            <View style={styles.conteudoCartao}>
                <View style={styles.headerCartao}>
                    <Text style={styles.tituloCartao} numberOfLines={1}>
                        {notificacao.titulo}
                    </Text>
                    <Text style={styles.dataHoraCartao}>
                        {notificacao.data} • {notificacao.hora}
                    </Text>
                </View>

                <Text style={styles.descricaoCartao}>
                    {notificacao.descricao}
                </Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    cartao: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius: 16, // Bordas um pouco mais arredondadas (mais clean)
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0', // Borda super fina e sutil
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04, // Sombra quase invisível, apenas para dar profundidade
        shadowRadius: 6,
        elevation: 1,
    },
    iconWrapper: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    conteudoCartao: {
        flex: 1,
        justifyContent: 'center',
    },
    headerCartao: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    tituloCartao: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1E293B', // Grafite escuro, excelente legibilidade
        flex: 1,
        marginRight: 8,
    },
    descricaoCartao: {
        fontSize: 14,
        fontWeight: '500',
        color: '#475569', // Grafite médio
        lineHeight: 20,
    },
    dataHoraCartao: {
        fontSize: 12,
        color: '#94A3B8', // Cinza claro para não roubar a atenção
        fontWeight: '600',
    }
});