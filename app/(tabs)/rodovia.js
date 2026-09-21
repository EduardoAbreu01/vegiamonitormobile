import React, { useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    Platform,
    TouchableOpacity
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router'; 
import Header from '../../components/header';

import rodoviasDB from '../../data/rodovias.json';
import cronogramasDB from '../../data/rocadas.json';
import { useAuth } from '../../context/AuthContext';

export default function RodoviaScreen() {
    const insets = useSafeAreaInsets();
    const { usuario } = useAuth(); 

    const dadosRodovia = rodoviasDB?.[0] || {
        rodovia: 'SP - 021',
        situacaoAtual: { status: 'ATENÇÃO', score: '60' },
        equipes: { disponiveis: 2 },
        detalhesKms: []
    };

    const { situacaoAtual, equipes, detalhesKms = [] } = dadosRodovia;

    const corAlerta = useMemo(() => {
        const scoreNum = parseInt(situacaoAtual.score, 10) || 0;
        if (scoreNum >= 75 || situacaoAtual.status.toUpperCase() === 'CRÍTICO') return '#FF1453';
        if (scoreNum >= 40) return '#FFEA00';
        return '#00E676';
    }, [situacaoAtual]);

    const metricas = useMemo(() => {
        let n1 = 0, n2 = 0, n3 = 0;
        detalhesKms.forEach(item => {
            if (item.nivel === 1) n1++;
            else if (item.nivel === 2) n2++;
            else if (item.nivel === 3) n3++;
        });

        let exec = 0, prog = 0;
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        cronogramasDB?.forEach(item => {
            if (!item?.local || !item?.data) return;

            if (usuario?.equipe && item?.equipe) {
                const equipeUsuario = usuario.equipe.trim().toLowerCase();
                const equipeItem = item.equipe.trim().toLowerCase();
                if (equipeItem !== equipeUsuario) return;
            }

            const localNormalizado = item.local.replace(/\s+/g, '').toLowerCase();
            const rodoviaNormalizada = dadosRodovia.rodovia.replace(/\s+/g, '').toLowerCase();

            if (localNormalizado === rodoviaNormalizada) {
                const [dia, mes, ano] = item.data.split('/');
                const anoCompleto = ano ? (ano.length === 2 ? `20${ano}` : ano) : hoje.getFullYear();
                const dataItem = new Date(parseInt(anoCompleto, 10), parseInt(mes, 10) - 1, parseInt(dia, 10));

                if (dataItem <= hoje) exec++;
                else prog++;
            }
        });

        return { n1, n2, n3, exec, prog };
    }, [detalhesKms, dadosRodovia.rodovia, usuario?.equipe]);

    return (
        <View style={[styles.container, { paddingTop: Platform.OS === 'ios' ? insets.top : 0 }]}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <Header />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                <View style={styles.cardHeader}>
                    <View style={styles.headerTopRow}>
                        <View>
                            <Text style={styles.labelStatus}>SITUAÇÃO ATUAL</Text>
                            <Text style={styles.nomeRodovia}>{dadosRodovia.rodovia}</Text>
                        </View>
                        <View style={[styles.badgeAtencao, { backgroundColor: corAlerta }]}>
                            <Ionicons name="warning" size={14} color="#000" style={{ marginRight: 4 }} />
                            <Text style={styles.badgeText}>{situacaoAtual.status}</Text>
                        </View>
                    </View>

                    <View style={styles.scoreWrapper}>
                        <View style={[styles.scoreCircle, { borderColor: corAlerta }]}>
                            <Text style={styles.scoreNumber}>{situacaoAtual.score}</Text>
                            <Text style={[styles.scoreLabel, { color: corAlerta }]}>SCORE IA</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.cardSection}
                    activeOpacity={0.7}
                    onPress={() => router.push('/detalhes-rodovia')} 
                >
                    <View style={styles.rowTitleIcon}>
                        <Text style={styles.sectionTitle}>Condições por Quilômetro</Text>
                        <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
                    </View>

                    <View style={styles.progressBar}>
                        <View style={[styles.progressSegment, { backgroundColor: '#00E676', flex: metricas.n1 || 1 }]} />
                        <View style={[styles.progressSegment, { backgroundColor: '#FFEA00', flex: metricas.n2 || 1 }]} />
                        <View style={[styles.progressSegment, { backgroundColor: '#FF1453', flex: metricas.n3 || 1 }]} />
                    </View>

                    <View style={styles.legendContainer}>
                        <View style={styles.legendItem}>
                            <View style={[styles.dot, { backgroundColor: '#FF1453' }]} />
                            <Text style={styles.legendText}>Nível 3 (&gt;30cm): <Text style={styles.boldText}>{metricas.n3} KM</Text></Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.dot, { backgroundColor: '#FFEA00' }]} />
                            <Text style={styles.legendText}>Nível 2 (10-20cm): <Text style={styles.boldText}>{metricas.n2} KM</Text></Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.dot, { backgroundColor: '#00E676' }]} />
                            <Text style={styles.legendText}>Nível 1 (&lt;10cm): <Text style={styles.boldText}>{metricas.n1} KM</Text></Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={styles.gridContainer}>
                    <TouchableOpacity style={styles.metricCard} activeOpacity={0.8}>
                        <View style={styles.iconCircleRoxo}>
                            <Ionicons name="checkmark-done" size={20} color="#612BFF" />
                        </View>
                        <Text style={styles.metricValueRoxo}>{metricas.exec}</Text>
                        <Text style={styles.metricLabel}>Executadas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.metricCard} activeOpacity={0.8}>
                        <View style={styles.iconCircleCinza}>
                            <Ionicons name="time-outline" size={20} color="#475569" />
                        </View>
                        <Text style={styles.metricValueCinza}>{metricas.prog}</Text>
                        <Text style={styles.metricLabel}>Programadas</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.equipesCard} activeOpacity={0.9}>
                    <View style={styles.equipesRow}>
                        <View style={styles.iconCircleVerde}>
                            <FontAwesome5 name="users" size={18} color="#15803D" />
                        </View>
                        <View style={{ marginLeft: 12 }}>
                            <Text style={styles.equipesLabel}>Equipes Disponíveis em Campo</Text>
                            <Text style={styles.equipesValue}>{equipes.disponiveis} Equipes Ativas</Text>
                        </View>
                    </View>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 30,
    },
    cardHeader: {
        backgroundColor: '#612BFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        elevation: 6,
        shadowColor: '#612BFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
    },
    headerTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    labelStatus: {
        color: '#D3C4FF',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    nomeRodovia: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 2,
    },
    badgeAtencao: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    badgeText: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 12,
        textTransform: 'uppercase',
    },
    scoreWrapper: {
        alignItems: 'center',
        marginTop: 15,
    },
    scoreCircle: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scoreNumber: {
        color: '#FFFFFF',
        fontSize: 38,
        fontWeight: 'bold',
        lineHeight: 42,
    },
    scoreLabel: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1,
    },
    cardSection: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 18,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    rowTitleIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1E293B',
    },
    progressBar: {
        height: 14,
        borderRadius: 7,
        flexDirection: 'row',
        overflow: 'hidden',
        marginBottom: 16,
        backgroundColor: '#F1F5F9',
    },
    progressSegment: {
        height: '100%',
    },
    legendContainer: {
        gap: 10,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 10,
    },
    legendText: {
        fontSize: 13,
        color: '#475569',
    },
    boldText: {
        fontWeight: 'bold',
        color: '#0F172A',
    },
    gridContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 12,
    },
    metricCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    iconCircleRoxo: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F3E8FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    iconCircleCinza: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    metricValueRoxo: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#612BFF',
    },
    metricValueCinza: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#475569',
    },
    metricLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#64748B',
        marginTop: 2,
    },
    equipesCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    equipesRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconCircleVerde: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#DCFCE7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    equipesLabel: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '600',
    },
    equipesValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#15803D',
        marginTop: 2,
    },
});