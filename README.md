# VegiaMonitor
---

## 👥 Integrantes
* Eduardo Abreu
* Gabriel De Biasi Couto
* Gabriel dos Anjos
* João Pedro da Silva Costa
* João Pedro de Souza Ferreira
* Rodrigo Campos Cordeiro

---

## ⚠️ O Problema Escolhido
A falta de comunicação em tempo real e a ausência de rastreabilidade entre os gestores de monitoramento e as frentes de conservação rodoviária (como as equipes de corte). 

Isso gera atrasos no cronograma, dificuldade em reportar imprevistos na via e risco de não conformidade com as exigências regulatórias da ARTESP e ANTT.

---

## 👤 A Persona Principal
* **Perfil:** Supervisor da Frente de Conservação (Equipe de Corte), 42 anos.
* **Rotina:** Ele está diariamente na rodovia coordenando os operadores. Precisa garantir que a equipe cumpra a meta do dia com segurança.
* **Habilidades Tecnológicas:** Tem familiaridade básica com smartphones, mas pouca paciência para sistemas complexos ou que necessitam 100% de estar conectado à internet.

---

## 💡 Proposta de Solução
O VegiaMonitor versão mobile é um aplicativo focado em conectar os operadores de campo aos gestores. 

Ele permite que as equipes de corte acessem seus cronogramas diários, verifiquem as condições da rodovia em tempo real e mudanças de rota vindas diretamente do gestor de monitoramento.

---

## 🛠️ Stack Tecnológica e Justificativa

* **Frontend Mobile:** React Native com Expo.
  * *Justificativa:* Permite o desenvolvimento ágil e multiplataforma (iOS e Android) com uma única base de código. O ecossistema do Expo facilita o acesso nativo a recursos vitais para o projeto, como a Câmera e o GPS do dispositivo.
* **Navegação:** React Navigation (Stack e Tab).
  * *Justificativa:* Garante fluxos de tela fluidos e nativos para o usuário alternar entre cronograma, rodovia e perfil.
* **Geolocalização e Mapas:** `expo-location` e `react-native-maps`.
  * *Justificativa:* Essencial para rastrear onde a frente de trabalho está atuando e para relatar ocorrências na via com coordenadas exatas para os relatórios da ARTESP/ANTT.
* **Armazenamento Local:** AsyncStorage.
  * *Justificativa:* Rodovias frequentemente possuem pontos sem sinal de celular. O app precisa salvar o cronograma e os dados localmente para funcionar offline e sincronizar automaticamente quando a rede for reestabelecida."# vegiamonitormobile" 
