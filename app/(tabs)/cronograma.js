import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  TouchableWithoutFeedback,
  StatusBar,
  Platform,
  ActivityIndicator
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';

import Header from "../../components/header";
import ListaCronograma from '../../components/ListaCronograma';
import { useAuth } from "../../context/AuthContext"; 
import { apiFetch } from "../../src/services/api"; 

export default function CronogramaScreen() {
  const [infoVisible, setInfoVisible] = useState(false);
  const [listaRocadas, setListaRocadas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [recarregando, setRecarregando] = useState(false);
  const [erro, setErro] = useState('');

  const insets = useSafeAreaInsets();
  const { usuario } = useAuth();

  // Função para buscar dados do backend
  const buscarRocadas = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRecarregando(true);
    } else {
      setCarregando(true);
    }
    setErro('');

    try {
      const dados = await apiFetch('/rocadas');
      setListaRocadas(Array.isArray(dados) ? dados : []);
    } catch (err) {
      console.error('Erro ao buscar cronograma de roçadas:', err);
      setErro('Não foi possível carregar o cronograma.');
    } finally {
      setCarregando(false);
      setRecarregando(false);
    }
  }, []);

  useEffect(() => {
    buscarRocadas();
  }, [buscarRocadas]);

  // Marca a roçada como concluída no estado local
  const handleConcluirRocada = (id) => {
    setListaRocadas(prev => 
      prev.map(item => 
        item.id === id ? { ...item, status: 'Concluído' } : item
      )
    );
  };

  // Filtra as roçadas pendentes para a equipe do usuário
  const proximasRocadas = useMemo(() => {
    return listaRocadas.filter(item => {
      if (!item?.data) return false;

      if (usuario?.equipe && item?.equipe) {
        const equipeUsuario = usuario.equipe.trim().toLowerCase();
        const equipeItem = item.equipe.trim().toLowerCase();
        if (equipeItem !== equipeUsuario) return false;
      }

      if (item?.status) {
        const statusLimpo = item.status
          .trim()
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');

        const statusFinalizados = ['concluido', 'concluida', 'executado', 'executada', 'finalizado', 'finalizada'];
        if (statusFinalizados.includes(statusLimpo)) {
          return false;
        }
      }

      return true;
    });
  }, [usuario, listaRocadas]);

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
              {carregando ? 'Carregando...' : `${proximasRocadas.length} ${proximasRocadas.length === 1 ? 'atividade pendente' : 'atividades pendentes'}`}
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
        {carregando ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#612BFF" />
          </View>
        ) : (
          <ListaCronograma 
            dados={proximasRocadas} 
            onConcluir={handleConcluirRocada}
            recarregando={recarregando}
            onRefresh={() => buscarRocadas(true)}
            erro={erro}
            onRetry={() => buscarRocadas()}
          />
        )}
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
    backgroundColor: '#F8FAFC',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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