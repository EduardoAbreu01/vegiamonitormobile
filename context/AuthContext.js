import React, { createContext, useState, useContext } from 'react';
import usuariosDB from '../data/usuarios.json';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [erro, setErro] = useState('');

    const login = (cpfDigitado) => {
        if (!cpfDigitado) {
            setErro('Preencha o CPF.');
            return false;
        }

        // Remove caracteres especiais do CPF
        const cpfLimpo = cpfDigitado.replace(/\D/g, '');

        const usuarioEncontrado = usuariosDB.find(
            u => u.cpf.replace(/\D/g, '') === cpfLimpo
        );

        if (usuarioEncontrado) {
            setUsuario(usuarioEncontrado);
            setErro('');
            return true;
        } else {
            setErro('CPF não encontrado.');
            return false;
        }
    };

    const logout = () => {
        setUsuario(null);
        setErro('');
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout, erro }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);