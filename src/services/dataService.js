// src/services/dataService.js
import { apiFetch } from './api';

// --- Trechos / Rodovias ---
export async function obteveTrechos() {
    return await apiFetch('/trechos');
}

export async function obteveTrechoPorId(id) {
    return await apiFetch(`/trechos/${id}`);
}

// --- Roçadas / Cronograma ---
export async function obteveRocadas() {
    return await apiFetch('/rocadas');
}

export async function criarRocada(dadosRocada) {
    return await apiFetch('/rocadas', {
        method: 'POST',
        body: JSON.stringify(dadosRocada),
    });
}

// --- Notificações ---
export async function obteveNotificacoes() {
    return await apiFetch('/notificacoes');
}