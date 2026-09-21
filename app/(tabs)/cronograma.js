import React, { useState, useMemo } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  TouchableWithoutFeedback,
  StatusBar,
  Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';

import Header from "../../components/header";
import ListaCronograma from '../../components/ListaCronograma';
import rocadasDB from '../../data/rocadas.json';
import { useAuth } from "../../context/AuthContext"; 

export default function CronogramaScreen() {
  const [infoVisible, setInfoVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const { usuario } = useAuth();

  const proximasRocadas = useMemo(() => {
    return rocadasDB.filter(item => {
      if (!item?.data) return false;

      // Filtra os itens de acordo com a equipe do colaborador logado
      if (usuario?.equipe && item?.equipe) {
        const equipeUsuario = usuario.equipe.trim().toLowerCase();
        const equipeItem = item.equipe.trim().toLowerCase();
        if (equipeItem !== equipeUsuario) return false;
      }

      // Oculta itens já marcados como Concluído
      if (item?.status && item.status.toLowerCase() === 'concluído') {
        return false;
      }

      return true;
    });
  }, [usuario]);

  return (
    <View style={[styles.containerPrincipal, { paddingTop: Platform.OS === 'ios' ? insets.top : 0 }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <Header />
      <View style={styles.controlPanel}>
        <View style={styles.titleWrapper}>
          <View style={styles.iconContainer}>
            <Feather name="calendar" size={20} color="#612BFF" />
          </View>
          <View>
            <Text style={styles.tituloSecao}>Cronograma Atual</Text>
            <Text style={styles.subtituloSecao}>
              {proximasRocadas.length} {proximasRocadas.length === 1 ? 'atividade pendente' : 'atividades pendentes'}
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.infoBtn}
          onPress={() => setInfoVisible(true)} 
          activeOpacity={0.7}
        >
          <Ionicons name="information-circle" size={24} color="#64748B" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <ListaCronograma dados={proximasRocadas} />
      </View>

      <Modal
        visible={infoVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setInfoVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <TouchableWithoutFeedback onPress={() => setInfoVisible(false)}>
            <View style={styles.backdropClickArea} />
          </TouchableWithoutFeedback>

          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Status de Prazos</Text>
              <TouchableOpacity onPress={() => setInfoVisible(false)}>
                <Feather name="x" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubtitle}>
              As cores indicam a urgência da execução do serviço planejado:
            </Text>

            <View style={styles.legendList}>
              <View style={styles.legendRow}>
                <View style={[styles.colorIndicator, { backgroundColor: '#00E676' }]} />
                <Text style={styles.legendText}>
                  <Text style={styles.legendBold}>Verde:</Text> Programado para hoje
                </Text>
              </View>

              <View style={styles.legendRow}>
                <View style={[styles.colorIndicator, { backgroundColor: '#FFEA00' }]} />
                <Text style={styles.legendText}>
                  <Text style={styles.legendBold}>Amarelo:</Text> Programado para esta semana
                </Text>
              </View>

              <View style={[styles.legendRow, { marginBottom: 0 }]}>
                <View style={[styles.colorIndicator, { backgroundColor: '#FF1453' }]} />
                <Text style={styles.legendText}>
                  <Text style={styles.legendBold}>Vermelho:</Text> Programado para a próxima semana
                </Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.btnEntendi}
              onPress={() => setInfoVisible(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.btnEntendiText}>Entendi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  controlPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tituloSecao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  subtituloSecao: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 2,
  },
  infoBtn: {
    padding: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)', 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backdropClickArea: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 20,
    marginBottom: 20,
  },
  legendList: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 24,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  legendText: {
    fontSize: 14,
    color: '#334155',
    flexShrink: 1,
  },
  legendBold: {
    fontWeight: 'bold',
    color: '#0F172A',
  },
  btnEntendi: {
    backgroundColor: '#612BFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnEntendiText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  }
});