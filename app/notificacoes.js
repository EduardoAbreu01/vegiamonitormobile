import React, { useState, useMemo } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList, 
    TouchableOpacity, 
    StatusBar, 
    Platform,
    ScrollView 
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import notificacoesDB from '../data/notificacoes.json';
import NotificacaoCard from '../components/notificacao.js';

export default function NotificacoesScreen() {    
    const insets = useSafeAreaInsets();
    
    const [filtroTempo, setFiltroTempo] = useState('all'); 
    const [filtroCor, setFiltroCor] = useState('all'); 

    const notificacoesFiltradas = useMemo(() => {
        let lista = [...notificacoesDB];
        const hoje = new Date(); 

        lista = lista.map(item => {
            if (!item.data) return { ...item, parsedDate: new Date(0) };
            
            const [dia, mes] = item.data.split('/');
            const [hora, min] = (item.hora || '00:00').split(':');
            
            const itemDate = new Date(hoje.getFullYear(), parseInt(mes, 10) - 1, parseInt(dia, 10), parseInt(hora, 10), parseInt(min, 10));
            return { ...item, parsedDate: itemDate };
        });

        lista.sort((a, b) => b.parsedDate - a.parsedDate);

        if (filtroCor !== 'all') {
            lista = lista.filter(item => item.color === filtroCor);
        }

        if (filtroTempo !== 'all') {
            const limiteDias = filtroTempo === '7d' ? 7 : 30;
            lista = lista.filter(item => {
                const diffTime = Math.abs(hoje.getTime() - item.parsedDate.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays <= limiteDias;
            });
        }

        return lista;
    }, [filtroTempo, filtroCor]);

    const coresDisponiveis = [
        { hex: '#FF1453', label: 'Urgente' },
        { hex: '#FFEA00', label: 'Atenção' },
        { hex: '#00E676', label: 'Sucesso' },
        { hex: '#612BFF', label: 'Sistema' }
    ];

    return (
        <View style={[styles.conteinerPrincipal, { paddingTop: Platform.OS === 'ios' ? insets.top : 0 }]}>
            <StatusBar barStyle="light-content" backgroundColor="#612BFF" />

            <View style={styles.cabecalho}>
                <TouchableOpacity 
                    style={styles.botaoVoltar} 
                    onPress={() => router.back()}
                    activeOpacity={0.7}
                >
                    <Ionicons name="arrow-back" size={26} color="#FFFFFF" />
                </TouchableOpacity>

                <View style={styles.conteinerIdentificacao}>
                    <View style={styles.textosCabecalho}>
                        <Text style={styles.tituloCabecalho}>Central de Alertas</Text>
                        <Text style={styles.subtituloCabecalho}>{notificacoesFiltradas.length} notificações encontradas</Text>
                    </View>
                </View>
            </View>

            <View style={styles.filtrosContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollFiltros}>
                    <TouchableOpacity 
                        style={[styles.chipFiltro, filtroTempo === 'all' && styles.chipFiltroAtivo]} 
                        onPress={() => setFiltroTempo('all')}
                    >
                        <Text style={[styles.textoChipFiltro, filtroTempo === 'all' && styles.textoChipFiltroAtivo]}>Todas</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={[styles.chipFiltro, filtroTempo === '7d' && styles.chipFiltroAtivo]} 
                        onPress={() => setFiltroTempo('7d')}
                    >
                        <Text style={[styles.textoChipFiltro, filtroTempo === '7d' && styles.textoChipFiltroAtivo]}>Últimos 7 dias</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={[styles.chipFiltro, filtroTempo === '30d' && styles.chipFiltroAtivo]} 
                        onPress={() => setFiltroTempo('30d')}
                    >
                        <Text style={[styles.textoChipFiltro, filtroTempo === '30d' && styles.textoChipFiltroAtivo]}>Últimos 30 dias</Text>
                    </TouchableOpacity>
                </ScrollView>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.scrollFiltros, { paddingBottom: 12 }]}>
                    <TouchableOpacity 
                        style={[styles.circuloCorContainer, filtroCor === 'all' && styles.circuloCorAtivo]} 
                        onPress={() => setFiltroCor('all')}
                    >
                        <View style={[styles.circuloCor, { backgroundColor: '#E2E8F0' }]}>
                            {filtroCor === 'all' && <Ionicons name="apps" size={14} color="#475569" />}
                        </View>
                        <Text style={styles.textoCorFiltro}>Todas</Text>
                    </TouchableOpacity>

                    {coresDisponiveis.map((cor, index) => (
                        <TouchableOpacity 
                            key={index}
                            style={[styles.circuloCorContainer, filtroCor === cor.hex && styles.circuloCorAtivo]} 
                            onPress={() => setFiltroCor(cor.hex)}
                        >
                            <View style={[styles.circuloCor, { backgroundColor: cor.hex }]}>
                                {filtroCor === cor.hex && <Feather name="check" size={14} color={cor.hex === '#FFEA00' ? '#000' : '#FFF'} />}
                            </View>
                            <Text style={styles.textoCorFiltro}>{cor.label}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={notificacoesFiltradas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <NotificacaoCard notificacao={item} />}
                contentContainerStyle={styles.listaNotificacoes}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.estadoVazio}>
                        <Ionicons name="notifications-off-outline" size={48} color="#94A3B8" />
                        <Text style={styles.textoEstadoVazio}>Nenhum alerta encontrado para este filtro.</Text>
                        <TouchableOpacity style={styles.botaoLimparFiltros} onPress={() => { setFiltroTempo('all'); setFiltroCor('all'); }}>
                            <Text style={styles.textoBotaoLimpar}>Limpar Filtros</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    conteinerPrincipal: {
        flex: 1,
        backgroundColor: '#F8FAFC', 
    },
    cabecalho: {
        backgroundColor: '#612BFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 16,
        paddingBottom: 20,
        elevation: 4,
        shadowColor: '#612BFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        zIndex: 2,
    },
    botaoVoltar: {
        marginRight: 16,
        padding: 4,
    },
    conteinerIdentificacao: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
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
        fontSize: 13,
        color: '#FFEA00', 
        fontWeight: '600',
        marginTop: 2,
    },
    filtrosContainer: {
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        paddingTop: 12,
        zIndex: 1,
    },
    scrollFiltros: {
        paddingHorizontal: 16,
        paddingBottom: 8,
        gap: 8,
        alignItems: 'center',
    },
    chipFiltro: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#F1F5F9',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    chipFiltroAtivo: {
        backgroundColor: '#F3E8FF',
        borderColor: '#612BFF',
    },
    textoChipFiltro: {
        fontSize: 13,
        fontWeight: '600',
        color: '#475569',
    },
    textoChipFiltroAtivo: {
        color: '#612BFF',
    },
    circuloCorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    circuloCorAtivo: {
        backgroundColor: '#F8FAFC',
        borderColor: '#E2E8F0',
    },
    circuloCor: {
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 6,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    textoCorFiltro: {
        fontSize: 13,
        fontWeight: '600',
        color: '#475569',
    },
    listaNotificacoes: {
        padding: 16,
        paddingBottom: 40,
    },
    estadoVazio: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 80,
    },
    textoEstadoVazio: {
        color: '#475569',
        fontSize: 15,
        fontWeight: '600',
        marginTop: 16,
        textAlign: 'center',
    },
    botaoLimparFiltros: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#F1F5F9',
        borderRadius: 8,
    },
    textoBotaoLimpar: {
        color: '#612BFF',
        fontWeight: 'bold',
        fontSize: 14,
    }
});