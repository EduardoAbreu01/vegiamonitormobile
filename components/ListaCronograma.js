import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useAuth } from '../context/AuthContext'; 

export default function ListaCronograma({ dados }) {
    const { usuario } = useAuth();

   
    const dadosFiltrados = (dados || []).filter(
        (item) => item.equipe === usuario?.equipe
    );

    const getIndicadorColor = (dataString) => {
        if (!dataString) return '#FF1453'; 

        const [diaStr,mesStr] = dataString.split('/');
        const anoAtual = new Date().getFullYear();
        
        const dataItem = new Date(anoAtual, parseInt(mesStr) - 1, parseInt(diaStr));
        
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        const diffTempo = dataItem.getTime() - hoje.getTime();
        const diffDias = Math.ceil(diffTempo / (1000 * 60 * 60 * 24));

        if (diffDias === 0) {
            return '#00E676'; 
        } else if (diffDias > 0 && diffDias <= 7) {
            return '#FFEA00'; 
        } else {
            return '#FF1453'; 
        }
    };

    const renderItem = ({ item }) => {
        const [diaStr,mesStr] = item.data.split('/');
        
        return (
            <View style={styles.cardContainer}>
                <View style={[styles.barraLateral, { backgroundColor: getIndicadorColor(item.data) }]} />
                
                <View style={styles.dataContainer}>
                    <Text style={styles.diaTexto}>{item.dia}</Text>
                    <Text style={styles.dataTexto}>{diaStr+'/'+mesStr}</Text>
                </View>

                <View style={styles.divisorVertical} />

                <View style={styles.infoContainer}>
                    <Text style={styles.equipeTexto}>{item.equipe}</Text>
                    <Text style={styles.detalhesTexto}>
                        {`${item.local.toUpperCase()} km ${item.km} | ${item.servico}`}
                    </Text>
                </View>

                <View style={styles.badgeContainer}>
                    <Text style={styles.badgeTexto}>{item.scoreIA}</Text>
                </View>
            </View>
        );
    };

    return (
        <FlatList
            data={dadosFiltrados}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listaContainer}
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    listaContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#F6F6FC', 
    },
    cardContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginVertical: 8,
        alignItems: 'center',
        height: 85,
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
    },
    dataContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        paddingLeft: 5,
    },
    diaTexto: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000000',
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
        paddingLeft: 15,
        justifyContent: 'center',
    },
    equipeTexto: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#8A8A8A',
        marginBottom: 6,
    },
    detalhesTexto: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#FF1453', 
    },
    badgeContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#FF1453',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    badgeTexto: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: 'bold',
    },
});