import { SafeAreaView, StyleSheet, View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Header from "../../components/header";
import Ionicons from '@expo/vector-icons/Ionicons';
import ListaCronograma from '../../components/ListaCronograma';
import rocadasDB from '../../data/rocadas.json';
import React, { useState } from 'react';

export default function cronograma() {
  const [infoVisible, setInfoVisible] = useState(false);

  const hoje = new Date();
  hoje.setHours(0,0,0,0);
  

  const proximasRocadas = rocadasDB.filter(item => {
    const [dia,mes,ano] = item.data.split(('/'));
    const itemData = new Date(`20${ano}`, parseInt(mes, 10) - 1, parseInt(dia, 10));
    return itemData >= hoje;
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Header />

        <View style={styles.subHeader}>
          <Text style={styles.tituloSecao}>Cronograma Atual</Text>
          <TouchableOpacity onPress={() => setInfoVisible(true)} activeOpacity={0.7}>
            <Ionicons name="information-circle" size={32} color="#42A5F5" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <ListaCronograma dados={proximasRocadas} />
        </View>
        <Modal
          visible={infoVisible}
          transparent={true}
          animationType="fade"
        >
          <TouchableWithoutFeedback onPress={() => setInfoVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.infoBox}>

                <View style={styles.legendRow}>
                  <View style={[styles.colorIndicator, { backgroundColor: '#00E676' }]} />
                  <Text style={styles.legendText}>Programado para hoje</Text>
                </View>

                <View style={styles.legendRow}>
                  <View style={[styles.colorIndicator, { backgroundColor: '#FFEA00' }]} />
                  <Text style={styles.legendText}>Programado para essa semana</Text>
                </View>

                <View style={[styles.legendRow, { marginBottom: 0 }]}>
                  <View style={[styles.colorIndicator, { backgroundColor: '#FF1453' }]} />
                  <Text style={styles.legendText}>Programado para próxima semana</Text>
                </View>

              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6FC',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 15,
    backgroundColor: '#F6F6FC',
  },
  tituloSecao: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF1453',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    infoBox: {
        position: 'absolute',
        top: 160, 
        right: 30, 
        backgroundColor: '#333333', 
        paddingVertical: 15,
        paddingLeft: 8, 
        borderRadius: 4,
        width: 250,
    },
    legendRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15, 
    },
    colorIndicator: {
        width: 14,
        height: 30,
        borderTopRightRadius: 8, 
        borderBottomRightRadius: 8,
        marginRight: 20,
    },
    legendText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
        flexShrink: 1, 
    }
});