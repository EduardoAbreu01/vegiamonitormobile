import React, { useState } from 'react';
import { router } from 'expo-router';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, StatusBar, Platform } from 'react-native';

import { useAuth } from '../context/AuthContext'; 

export default function LoginScreen({ navigation }) {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  

  const { login, erro } = useAuth(); 

  const handleSubmeter = () => {
    const sucesso = login(cpf, senha);

    if (sucesso){
      router.replace('/cronograma')
    }

  };

  const logaparateste = () => {
    router.replace('/cronograma')
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#612BFF" />
      
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>M</Text>
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>VegiaMonitor</Text>
          <Text style={styles.headerSubtitle}>FIAP + Motiva</Text>
        </View>
      </View>

      <View style={styles.body}>
        
        <Image 
          style={styles.illustration}
          resizeMode="contain"
          source={require('../assets/imagemlogin.jpg')} 
        />
        
        <View style={styles.formContainer}>
          

          <TextInput
            style={styles.input}
            placeholder="Insira o CPF"
            placeholderTextColor="#BCA4FF"
            keyboardType="numeric"
            value={cpf}
            onChangeText={(texto) => setCpf(texto)}
          />
    
          <TextInput
            style={styles.input}
            placeholder="Insira a Senha"
            placeholderTextColor="#BCA4FF"
            secureTextEntry={true}
            value={senha}
            onChangeText={(texto) => setSenha(texto)}
          />

          {erro ? <Text style={{color: 'red', textAlign: 'center', marginBottom: 10}}>{erro}</Text> : null}

          <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleSubmeter}>
            <Text style={styles.buttonText}>Entrar22</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={logaparateste}>
            <Text style={styles.buttonText}>Entrar22</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#612BFF', 
  },
  header: {
    backgroundColor: '#612BFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    paddingBottom: 30,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#612BFF',
  },
  headerTextContainer: {
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#D4C4FF', 
    fontWeight: '500',
  },
  body: {
    flex: 1,
    backgroundColor: '#F6F6FC',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  illustration: {
    width: 250,
    height: 200,
    marginTop: 50,
    marginBottom: 40,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 25,
    fontSize: 16,
    color: '#333333',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  button: {
    backgroundColor: '#612BFF',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,

    shadowColor: '#612BFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});