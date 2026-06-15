import React, { createContext, useState, useContext } from 'react';

import usuariosDB from '../data/usuarios.json'; 

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [erro, setErro] = useState('');

  const login = (cpf, senha) => {
    const usuarioEncontrado = usuariosDB.find(
      (u) => u.cpf === cpf && u.senha === senha
    );

    if (usuarioEncontrado) {
      setUsuario(usuarioEncontrado);
      setErro('');
      return true; 
    } else {
      setErro('CPF ou senha incorretos.');
      return false; 
    }
  };

  const logout = () => {
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, erro }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}