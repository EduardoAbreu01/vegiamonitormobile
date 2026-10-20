import AsyncStorage from '@react-native-async-storage/async-storage';

// Utiliza a variável do .env e usa a URL do Render como fallback
export const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://vegiamonitor-backend.onrender.com';

export async function apiFetch(endpoint, options = {}) {
    const token = await AsyncStorage.getItem('userToken');

    // Identifica se o corpo é um FormData (upload de imagens/arquivos)
    const isFormData = options.body instanceof FormData;

    const defaultHeaders = {
        // Se for FormData, não define Content-Type (o Fetch gerencia o boundary)
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        'Accept': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };

    // Configuração de Timeout (ex: 30 segundos para cobrir cold start do Render)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
        signal: options.signal || controller.signal,
    };

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, config);
        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const err = new Error(errorData.mensagem || errorData.message || `Erro HTTP ${response.status}`);
            err.status = response.status; // Anexa o código HTTP ao erro
            throw err;
        }

        if (response.status === 204) return null;

        return await response.json();
    } catch (error) {
        clearTimeout(timeoutId);

        if (error.name === 'AbortError') {
            throw new Error('A conexão demorou muito para responder. Tente novamente.');
        }

        console.error(`Erro no pedido [${endpoint}]:`, error);
        throw error;
    }
}