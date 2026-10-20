import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Alert,
    RefreshControl
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function ListaCronograma({ 
    dados, 
    onConcluir, 
    recarregando = false, 
    onRefresh, 
    erro, 
    onRetry 
}) {

    const parseData = (dataString) => {
        if (!dataString) return null;
        const partes = dataString.trim().split(/[/.-]/);
        if (partes.length < 2) return null;

        const dia = parseInt(partes[0], 10);
        const mes = parseInt(partes[1], 10) - 1;
        const hoje = new Date();

        let ano = hoje.getFullYear();
        if (partes[2]) {
            const anoParsed = parseInt(partes[2], 10);
            ano = anoParsed < 100 ? 2000 + anoParsed : anoParsed;
        }

        return new Date(ano, mes, dia, 0, 0, 0, 0);
    };

    const getDiffDias = (dataString) => {
        const dataItem = parseData(dataString);
        if (!dataItem) return -999;

        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        const diffMs = dataItem.getTime() - hoje.getTime();
        return Math.round(diffMs / (1000 * 60 * 60 * 24));
    };

    const isDataHoje = (dataString) => {
        return getDiffDias(dataString) === 0;
    };

    const getIndicadorColor = (dataString) => {
        const diffDias = getDiffDias(dataString);

        if (diffDias === 0) {
            return '#00E676';
        } else if (diffDias > 0 && diffDias <= 7) {
            return '#FFEA00';
        } else {
            return '#FF1453';
        }
    };

    const handleAcaoConcluir = (item) => {
        if (isDataHoje(item.data)) {
            Alert.alert(
                'Confirmar Conclusão',
                `Deseja marcar a roçada do ${item.local.toUpperCase()} KM ${item.km} como concluída?`,
                [
                    { text: 'Cancelar', style: 'cancel' },
                    {
                        text: 'Concluir',
                        style: 'default',
                        onPress: () => {
                            if (onConcluir) {
                                onConcluir(item.id);
                            }
                        }
                    }
                ]
            );
        } else {
            Alert.alert(
                'Ação Não Permitida',
                `Esta roçada está agendada para ${item.data},\npara alterar a data ou reportar adiantamento, entre em contato com o seu gestor.`,
                [{ text: 'Entendido', style: 'default' }]
            );
        }
    };

    const renderItem = ({ item }) => {
        const [diaStr, mesStr] = (item.data || '').split('/');

        return (
            <View style={styles.cardContainer}>
                <View style={[styles.barraLateral, { backgroundColor: getIndicadorColor(item.data) }]} />

                <View style={styles.dataContainer}>
                    <Text style={styles.diaTexto}>{item.dia}</Text>
                    <Text style={styles.dataTexto}>{`${diaStr}/${mesStr}`}</Text>
                </View>

                <View style={styles.divisorVertical} />

                <View style={styles.infoContainer}>
                    <Text style={styles.equipeTexto}>{item.equipe}</Text>
                    <Text style={styles.detalhesTexto}>
                        {`${(item.local || '').toUpperCase()} km ${item.km} | ${item.servico}`}
                    </Text>
                </View>

                <View style={styles.acoesContainer}>
                    <View style={styles.badgeContainer}>
                        <Text style={styles.badgeTexto}>{item.scoreIA}</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.btnConcluir}
                        onPress={() => handleAcaoConcluir(item)}
                        activeOpacity={0.7}
                        accessibilityLabel="Concluir roçada"
                    >
                        <Feather name="check-circle" size={18} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <FlatList
            data={dados}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            style={styles.flatList}
            contentContainerStyle={styles.listaContainer}
            showsVerticalScrollIndicator={false}
            refreshControl={
                onRefresh ? (
                    <RefreshControl 
                        refreshing={recarregando} 
                        onRefresh={onRefresh}
                        colors={['#612BFF']}
                        tintColor="#612BFF"
                    />
                ) : undefined
            }
            ListEmptyComponent={
                <View style={styles.estadoVazio}>
                    <Ionicons 
                        name={erro ? "alert-circle-outline" : "calendar-outline"} 
                        size={48} 
                        color="#94A3B8" 
                    />
                    <Text style={styles.textoEstadoVazio}>
                        {erro || 'Nenhuma atividade pendente no cronograma.'}
                    </Text>
                    {erro && onRetry ? (
                        <TouchableOpacity style={styles.botaoTentarNovamente} onPress={onRetry}>
                            <Text style={styles.textoBotaoTentar}>Tentar Novamente</Text>
                        </TouchableOpacity>
                    ) : null}
                </View>
            }
        />
    );
}

const styles = StyleSheet.create({
    flatList: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    listaContainer: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#F8FAFC',
        paddingBottom: 40,
        flexGrow: 1,
    },
    cardContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginVertical: 8,
        alignItems: 'center',
        minHeight: 85,
        paddingVertical: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#EAEAEA',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    barraLateral: {
        width: 14,
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
    },
    dataContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        paddingLeft: 14,
    },
    diaTexto: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        textTransform: 'capitalize',
    },
    dataTexto: {
        fontSize: 11,
        color: '#8A8A8A',
        fontWeight: '500',
        marginTop: 2,
    },
    divisorVertical: {
        width: 1,
        height: '60%',
        backgroundColor: '#E2E2FF',
    },
    infoContainer: {
        flex: 1,
        paddingLeft: 12,
        paddingRight: 6,
        justifyContent: 'center',
    },
    equipeTexto: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#8A8A8A',
        marginBottom: 4,
    },
    detalhesTexto: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FF1453',
    },
    acoesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        gap: 6,
    },
    badgeContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#FF1453',
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeTexto: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    btnConcluir: {
        width: 38,
        height: 38,
        borderRadius: 10,
        backgroundColor: '#00E676',
        justifyContent: 'center',
        alignItems: 'center',
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
    botaoTentarNovamente: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#F1F5F9',
        borderRadius: 8,
    },
    textoBotaoTentar: {
        color: '#612BFF',
        fontWeight: 'bold',
        fontSize: 14,
    }
});