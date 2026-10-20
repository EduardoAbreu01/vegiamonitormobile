import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiFetch } from './api';

const QUEUE_KEY = '@VegiaQueue:acoes';

export async function adicionarAcaoFila(endpoint, method, body) {
    try {
        const filaAtual = await obterFila();
        const novaAcao = {
            id: Date.now().toString(),
            endpoint,
            method,
            body,
            timestamp: new Date().toISOString()
        };
        filaAtual.push(novaAcao);
        await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(filaAtual));
        console.log('[OFFLINE QUEUE] Ação gravada localmente para sincronização futura.');
    } catch (error) {
        console.error('Erro ao salvar ação na fila offline:', error);
    }
}

// Obtém a lista de ações pendentes
export async function obterFila() {
    try {
        const dados = await AsyncStorage.getItem(QUEUE_KEY);
        return dados ? JSON.parse(dados) : [];
    } catch {
        return [];
    }
}

// Tenta sincronizar todas as ações armazenadas com o backend
export async function sincronizarFilaOffline() {
    const fila = await obterFila();
    if (fila.length === 0) return;

    console.log(`[OFFLINE QUEUE] Iniciando sincronização de ${fila.length} item(ns)...`);
    const novaFila = [];

    for (const item of fila) {
        try {
            await apiFetch(item.endpoint, {
                method: item.method,
                body: JSON.stringify(item.body)
            });
            console.log(`[OFFLINE QUEUE] Ação ${item.id} sincronizada com sucesso.`);
        } catch (error) {
            // Se falhar novamente por rede, mantém o item na fila
            console.warn(`[OFFLINE QUEUE] Falha ao sincronizar ${item.id}. Será tentado novamente.`);
            novaFila.push(item);
        }
    }

    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(novaFila));
}