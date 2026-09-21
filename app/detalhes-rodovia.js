import React, { useState, useMemo } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList, 
    TouchableOpacity, 
    StatusBar, 
    Platform 
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import rodoviasDB from '../data/rodovias.json'; 

export default function DetalhesRodoviaScreen() {    
    const insets = useSafeAreaInsets();

    const [mostrarTodos, setMostrarTodos] = useState(false);
    
    const dadosRodovia = rodoviasDB?.[0] || { rodovia: 'SP - 021', detalhesKms: [] };
    
    const { trechosOrdenados, trechosCriticos } = useMemo(() => {
        const ordenados = [...(dadosRodovia.detalhesKms || [])].sort((a, b) => a.km - b.km);
        const criticos = ordenados.filter(item => item.nivel === 3);
        return { trechosOrdenados: ordenados, trechosCriticos: criticos };
    }, [dadosRodovia]);

    const trechosExibidos = mostrarTodos ? trechosOrdenados : trechosCriticos;

    const obterEstiloNivel = (nivel) => {
        switch (nivel) {
            case 3: return { corBotao: '#FF1453', bgIcone: '#FFE4E6', icone: 'alert-triangle', textoStatus: 'Crítico' };
            case 2: return { corBotao: '#F59E0B', bgIcone: '#FEF3C7', icone: 'alert-circle', textoStatus: 'Atenção' };
            case 1: 
            default: return { corBotao: '#10B981', bgIcone: '#F1F5F9', icone: 'check', textoStatus: 'Normal' };
        }
    };

    const renderItem = ({ item }) => {
        const estilo = obterEstiloNivel(item.nivel);
        const isCritico = item.nivel === 3;

        return (
            <View style={[styles.cardTrecho, isCritico && styles.cardTrechoCritico]}>
                <View style={[styles.iconeContainer, { backgroundColor: estilo.bgIcone }]}>
                    <Feather name={estilo.icone} size={18} color={estilo.corBotao} />
                </View>
                
                <View style={styles.conteudoTrecho}>
                    <Text style={styles.tituloKm}>KM {item.km}</Text>
                    <Text style={styles.descricaoNivel}>
                        Nível {item.nivel} 
                        {item.nivel === 1 ? ' (<10cm)' : item.nivel === 2 ? ' (10-20cm)' : ' (>30cm)'} 
                        {' • '}{estilo.textoStatus}
                    </Text>
                </View>

                {isCritico && (
                    <View style={styles.alertaContainer}>
                        <Ionicons name="warning" size={20} color="#FF1453" />
                    </View>
                )}
            </View>
        );
    };

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

                <View style={styles.textosCabecalho}>
                    <Text style={styles.tituloCabecalho}>Detalhamento de Trechos</Text>
                    <Text style={styles.subtituloCabecalho}>{dadosRodovia.rodovia} • {trechosOrdenados.length} KMs mapeados</Text>
                </View>
            </View>


            <View style={styles.barraFiltro}>
                <View style={styles.infoFiltro}>
                    <Ionicons name={mostrarTodos ? "list" : "warning"} size={20} color={mostrarTodos ? "#64748B" : "#FF1453"} />
                    <Text style={styles.textoInfoFiltro}>
                        {mostrarTodos 
                            ? `Mostrando todos (${trechosOrdenados.length})` 
                            : `Mostrando críticos (${trechosCriticos.length})`}
                    </Text>
                </View>

                <TouchableOpacity 
                    style={[styles.botaoAlternar, mostrarTodos && styles.botaoAlternarAtivo]}
                    onPress={() => setMostrarTodos(!mostrarTodos)}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.textoBotaoAlternar, mostrarTodos && styles.textoBotaoAlternarAtivo]}>
                        {mostrarTodos ? "Ver Apenas Críticos" : "Ver Todos os Trechos"}
                    </Text>
                </TouchableOpacity>
            </View>


            <FlatList
                data={trechosExibidos}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listaContainer}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.estadoVazio}>
                        <Feather 
                            name={mostrarTodos ? "map" : "check-circle"} 
                            size={56} 
                            color={mostrarTodos ? "#94A3B8" : "#10B981"} 
                        />
                        <Text style={[styles.textoEstadoVazio, !mostrarTodos && { color: '#10B981' }]}>
                            {mostrarTodos 
                                ? 'Nenhum dado de quilometragem encontrado.' 
                                : 'Excelente! Não há trechos em estado crítico nesta rodovia.'}
                        </Text>
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
    textosCabecalho: {
        flex: 1,
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
    
    /* NOVA BARRA DE FILTRO */
    barraFiltro: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        zIndex: 1,
    },
    infoFiltro: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textoInfoFiltro: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1E293B',
        marginLeft: 8,
    },
    botaoAlternar: {
        backgroundColor: '#F1F5F9',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    botaoAlternarAtivo: {
        backgroundColor: '#F3E8FF',
        borderColor: '#D8B4FE',
    },
    textoBotaoAlternar: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#475569',
    },
    textoBotaoAlternarAtivo: {
        color: '#612BFF',
    },

    listaContainer: {
        padding: 16,
        paddingBottom: 40,
    },
    cardTrecho: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginBottom: 10,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
    },
    cardTrechoCritico: {
        borderColor: '#FECDD3',
        backgroundColor: '#FFF1F2',
    },
    iconeContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    conteudoTrecho: {
        flex: 1,
        justifyContent: 'center',
    },
    tituloKm: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0F172A',
        marginBottom: 2,
    },
    descricaoNivel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#475569', 
    },
    alertaContainer: {
        paddingLeft: 10,
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
        paddingHorizontal: 20,
        lineHeight: 22,
    }
});