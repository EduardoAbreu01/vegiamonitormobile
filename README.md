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
O **VegiaMonitor** é um aplicativo mobile focado em criar uma ponte digital entre o campo e a gestão da Motiva. Ele centraliza a rotina do operador de campo, permitindo visualizar cronogramas de trabalho com indicadores visuais de prazo, acompanhar o score e a condição exata da rodovia (nível da grama), receber alertas da gestão em tempo real e facilitar o contato rápido com os supervisores.

---

## 🛠️ Stack Tecnológica e Justificativa

* **Frontend Mobile:** React Native com Expo.
  * *Justificativa:* Permite o desenvolvimento ágil e multiplataforma com uma única base de código em JavaScript/TypeScript. O ecossistema do Expo agiliza o setup do projeto e o teste em dispositivos físicos.
* **Navegação:** React Navigation (Bottom Tabs e Stack).
  * *Justificativa:* Garante uma navegação fluida entre as telas principais (Cronograma, Rodovia, Perfil) e fluxos modais (Notificações, Login), simulando o comportamento nativo esperado pelos usuários.
* **Armazenamento Local:** AsyncStorage.
  * *Justificativa:* Essencial para a estratégia *offline-first*. Permite salvar os dados do cronograma e o status da rodovia no cache do celular, garantindo que o app funcione em áreas de "sombra" de sinal de celular comuns nas estradas.
* **Integração Externa:** Deep Linking (`Linking` do React Native).
  * *Justificativa:* Utilizado na tela de Perfil para redirecionar o usuário diretamente para o WhatsApp corporativo do gestor, facilitando a comunicação imediata.

---

## 📱 Protótipo Figma
🔗 [Clique aqui para acessar o protótipo navegável no Figma](https://www.figma.com/proto/e7N028hcvrNlGwY91rd7N2/Prot%C3%B3tipo-Vegia-Monitor-Mobile?node-id=2-2&p=f&t=ExTvm6irflxRztrv-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A2)
