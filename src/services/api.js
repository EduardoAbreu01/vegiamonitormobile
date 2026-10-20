import AsyncStorage from '@react-native-async-storage/async-storage';

export const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://vegiamonitor-backend.onrender.com';

const PREFIXO_CACHE = '@VegiaCache:';

export async function apiFetch(endpoint, options = {}) {
    const method = (options.method || 'GET').toUpperCase();
    const cacheKey = `${PREFIXO_CACHE}${endpoint}`;

    // Recupera o token de autenticação
    const usuarioSalvo = await AsyncStorage.getItem('@VegiaMonitor:usuario');
    const token = usuarioSalvo ? JSON.parse(usuarioSalvo).token : null;

    const isFormData = options.body instanceof FormData;

    const defaultHeaders = {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        'Accept': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s de timeout

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
            err.status = response.status;
            throw err;
        }

        if (response.status === 204) return null;

        const data = await response.json();

        // Se a requisição GET for bem-sucedida, atualiza o cache local
        if (method === 'GET') {
            await AsyncStorage.setItem(cacheKey, JSON.stringify(data));
        }

        return data;
    } catch (error) {
        clearTimeout(timeoutId);

        // Se for uma requisição de leitura (GET) e falhar por falta de rede/timeout, tenta recuperar do cache
        if (method === 'GET') {
            const cachedData = await AsyncStorage.getItem(cacheKey);
            if (cachedData !== null) {
                console.log(`[OFFLINE] Servindo dados em cache para: ${endpoint}`);
                return JSON.parse(cachedData);
            }
        }

        if (error.name === 'AbortError') {
            const cachedData = await AsyncStorage.getItem(cacheKey);
            if (method === 'GET' && cachedData !== null) {
                return JSON.parse(cachedData);
            }
            throw new Error('A conexão demorou muito para responder.');
        }

        console.error(`Erro no pedido [${endpoint}]:`, error);
        throw error;
    }
}