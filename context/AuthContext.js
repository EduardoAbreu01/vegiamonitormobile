import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiFetch } from '../src/services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function carregarSessao() {
            try {
                const usuarioSalvo = await AsyncStorage.getItem('@VegiaMonitor:usuario');
                if (usuarioSalvo) {
                    setUsuario(JSON.parse(usuarioSalvo));
                }
            } catch (error) {
                console.error('Erro ao carregar sessão salva:', error);
            } finally {
                setCarregando(false);
            }
        }
        carregarSessao();
    }, []);

    const login = async (cpfDigitado, senhaDigitada) => {
        if (!cpfDigitado || !senhaDigitada) {
            setErro('Preencha o CPF e a senha.');
            return false;
        }

        const cpfLimpo = cpfDigitado.trim().replace(/\D/g, '');

        setCarregando(true);
        setErro('');

        try {
            const usuarioLogado = await apiFetch('/usuarios/login', {
                method: 'POST',
                body: JSON.stringify({
                    cpf: cpfLimpo || cpfDigitado.trim(),
                    senha: senhaDigitada,
                }),
            });

            if (usuarioLogado) {
                setUsuario(usuarioLogado);
                await AsyncStorage.setItem('@VegiaMonitor:usuario', JSON.stringify(usuarioLogado));
                setErro('');
                setCarregando(false);
                return true;
            }
        } catch (error) {
            console.error('Erro no login:', error);

            // Trata explicitamente o erro de credenciais inválidas (401)
            if (error.status === 401 || error.message?.includes('401')) {
                setErro('CPF ou senha incorretos.');
            } else {
                setErro(error.message || 'Erro de conexão com o servidor.');
            }
        }

        setCarregando(false);
        return false;
    };

    const logout = async () => {
        setUsuario(null);
        setErro('');
        await AsyncStorage.removeItem('@VegiaMonitor:usuario');
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout, erro, carregando }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);