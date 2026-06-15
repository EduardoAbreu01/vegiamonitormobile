import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Header from '../../components/header'; 

import rodoviasDB from '../../data/rodovias.json'; 
import cronogramasDB from '../../data/rocadas.json'; 

export default function RodoviaScreen() {
    const dadosRodovia = rodoviasDB[0];
    const { situacaoAtual, equipes, detalhesKms } = dadosRodovia;

    let qtdNivel1 = 0;
    let qtdNivel2 = 0;
    let qtdNivel3 = 0;

    detalhesKms.forEach(item => {
        if (item.nivel === 1) qtdNivel1++;
        else if (item.nivel === 2) qtdNivel2++;
        else if (item.nivel === 3) qtdNivel3++;
    });

    const cond = {
        nivel3: { descricao: "Nível 3 (>30cm):", quantidadeKm: qtdNivel3, cor: "#FF1453" },
        nivel2: { descricao: "Nível 2 (10-20cm):", quantidadeKm: qtdNivel2, cor: "#FFEA00" },
        nivel1: { descricao: "Nível 1 (<10cm):", quantidadeKm: qtdNivel1, cor: "#00E676" }
    };

    let rocadasExecutadas = 0;
    let rocadasProgramadas = 0;

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
   cronogramasDB.forEach(item => {
        const localNormalizado = item.local.replace(/\s+/g, '').toLowerCase();
        const rodoviaNormalizada = dadosRodovia.rodovia.replace(/\s+/g, '').toLowerCase();
        
        if (localNormalizado === rodoviaNormalizada) {
            const [diaStr, mesStr] = item.data.split('/');
            const anoAtual = hoje.getFullYear();
            
            const dataItem = new Date(anoAtual, parseInt(mesStr) - 1, parseInt(diaStr));
            
            const diferencaMs = Math.abs(hoje.getTime() - dataItem.getTime());
            
            const diasDiferenca = Math.ceil(diferencaMs / (1000 * 60 * 60 * 24));
            
            if (dataItem <= hoje && diasDiferenca <= 20) {
                rocadasExecutadas++;
            } else if (dataItem > hoje) {
                rocadasProgramadas++;
            }
        }
    });

    return (
        <SafeAreaView style={styles.conteiner}>
            <Header />

            <ScrollView contentContainerStyle={styles.conteudoRolavel} showsVerticalScrollIndicator={false}>
                
                <View style={styles.cartao}>
                    <View style={styles.linhaCabecalhoCartao}>
                        <View>
                            <Text style={styles.tituloRosa}>SITUAÇÃO ATUAL</Text>
                            <Text style={styles.subtituloCinza}>{dadosRodovia.rodovia}</Text>
                        </View>
                        
                        <View style={[styles.etiquetaStatus, { backgroundColor: situacaoAtual.corStatus }]}>
                            <Text style={[styles.textoStatus, { color: situacaoAtual.corTextoStatus }]}>
                                {situacaoAtual.status}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.conteinerPontuacao}>
                        <View style={[styles.circuloPontuacao, { borderColor: '#FFEA00' }]}>
                            <Text style={styles.numeroPontuacao}>{situacaoAtual.score}</Text>
                            <Text style={styles.rotuloPontuacao}>SCORE</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.cartao}>
                    <Text style={styles.tituloCinza}>Condições por Quilômetro</Text>
                    
                    <View style={styles.conteinerBarraProgresso}>
                        <View style={[styles.segmentoProgresso, { backgroundColor: cond.nivel1.cor, flex: cond.nivel1.quantidadeKm }]} />
                        <View style={[styles.segmentoProgresso, { backgroundColor: cond.nivel2.cor, flex: cond.nivel2.quantidadeKm }]} />
                        <View style={[styles.segmentoProgresso, { backgroundColor: cond.nivel3.cor, flex: cond.nivel3.quantidadeKm }]} />
                    </View>

                    <View style={styles.conteinerLegenda}>
                        {[cond.nivel3, cond.nivel2, cond.nivel1].map((nivel, index) => (
                            <View key={index} style={styles.linhaLegenda}>
                                <View style={[styles.quadradoLegenda, { backgroundColor: nivel.cor }]} />
                                <Text style={styles.textoLegenda}>
                                    {nivel.descricao} {nivel.quantidadeKm} KM
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.linhaCartoesInferiores}>
                    
                    <View style={[styles.cartao, styles.meioCartao]}>
                        <Text style={styles.tituloPequenoRosa}>Roçadas (Últimos 7 dias)</Text>
                        
                        <View style={styles.caixaInterna}>
                            <Text style={styles.rotuloCaixaInterna}>Executadas</Text>
                            <Text style={styles.valorCaixaInternaRoxo}>{rocadasExecutadas}</Text>
                        </View>

                        <View style={styles.caixaInterna}>
                            <Text style={styles.rotuloCaixaInterna}>Programadas</Text>
                            <Text style={styles.valorCaixaInternaCinza}>{rocadasProgramadas}</Text>
                        </View>
                    </View>

                    <View style={[styles.cartao, styles.meioCartao]}>
                        <Text style={styles.tituloPequenoRosa}>Equipes</Text>
                        
                        <View style={[styles.caixaInterna, { marginTop: 45 }]}>
                            <Text style={styles.rotuloCaixaInterna}>Equipes Disponíveis</Text>
                            <Text style={styles.valorCaixaInternaVerde}>{equipes.disponiveis}</Text>
                        </View>
                    </View>

                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        backgroundColor: '#F6F6FC',
    },
    conteudoRolavel: {
        padding: 20,
        paddingBottom: 40,
    },
    cartao: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#EAEAEA',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    linhaCabecalhoCartao: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    tituloRosa: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF1453',
    },
    subtituloCinza: {
        fontSize: 14,
        color: '#A0A0A0',
        fontWeight: '600',
        marginTop: 2,
    },
    etiquetaStatus: {
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 20,
    },
    textoStatus: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    conteinerPontuacao: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    circuloPontuacao: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 14, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    numeroPontuacao: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000000',
    },
    rotuloPontuacao: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000000',
        marginTop: -2,
    },
    tituloCinza: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#8A8A8A',
        marginBottom: 15,
    },
    conteinerBarraProgresso: {
        height: 22,
        borderRadius: 11,
        flexDirection: 'row',
        overflow: 'hidden',
        marginBottom: 15,
    },
    segmentoProgresso: {
        height: '100%',
    },
    conteinerLegenda: {
        marginTop: 5,
    },
    linhaLegenda: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    quadradoLegenda: {
        width: 16,
        height: 16,
        borderRadius: 4,
        marginRight: 10,
    },
    textoLegenda: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#8A8A8A',
    },
    linhaCartoesInferiores: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15, 
    },
    meioCartao: {
        flex: 1, 
        padding: 15,
    },
    tituloPequenoRosa: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#FF1453',
        marginBottom: 15,
    },
    caixaInterna: {
        backgroundColor: '#F4EBFF', 
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#E6D9FF',
    },
    rotuloCaixaInterna: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 5,
        textAlign: 'center',
    },
    valorCaixaInternaRoxo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#612BFF', 
    },
    valorCaixaInternaCinza: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#8A8A8A', 
    },
    valorCaixaInternaVerde: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#00E676', 
    }
});