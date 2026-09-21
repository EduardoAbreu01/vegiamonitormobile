# Documento de Testes Manuais — Sprint 3

## Cobertura de Testes dos Fluxos Principais

| ID | Fluxo / Cenário Testado | Passos Executados | Resultado Esperado | Resultado Obtido | Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TC01** | **Autenticação por CPF/Senha** | 1. Digitar um CPF válido do `usuarios.json` e senha .<br>2. Clicar em "Entrar". | Login realizado com sucesso e redirecionamento para a tela principal (Rodovia). | Usuário autenticado e redirecionado para a Dashboard da Rodovia. | **PASSOU** |
| **TC02** | **Validação de CPF/senha Inválido** | 1. Digitar CPF não cadastrado ou em branco.<br>2. Clicar em "Entrar". | Exibição de mensagem de erro informando "CPF não encontrado" ou "Preencha o CPF". | Mensagem de erro exibida corretamente na tela sem crash. | **PASSOU** |
| **TC03** | **Visualização das Condições da Rodovia** | 1. Estar logado no app.<br>2. Navegar para a aba "Rodovia".<br>3. Consultar cards de pontuação e trechos. | Exibição dos dados do score geral de IA, trechos operacionais e indicação visual de criticidade. | Dados carregados do `rodovias.json` com indicadores de cor funcionais. | **PASSOU** |
| **TC04** | **Filtragem do Cronograma por Equipe** | 1. Acessar a aba "Cronograma".<br>2. Verificar lista de roçadas pendentes. | Exibir apenas as roçadas atribuídas à equipe do usuário logado e ocultar as concluídas. | Apenas as atividades pendentes da equipe logada foram renderizadas na lista. | **PASSOU** |
| **TC05** | **Modal Informativo de Legenda de Cores** | 1. Na tela de Cronograma, clicar no ícone `(i)`.<br>2. Clicar em "Entradi" para fechar. | Abertura do modal explicando o significado das cores (Verde, Amarelo, Vermelho) e fechamento suave. | Modal abriu informando os prazos e fechou corretamente ao clicar no botão. | **PASSOU** |
| **TC06** | **Navegação no Menu Lateral e Logout** | 1. Clicar no botão do Menu/Header.<br>2. Clicar na opção "Sair / Logout". | Encerramento da sessão no `AuthContext` e retorno para a tela de Login. | Estado do usuário limpo e navegação redirecionada para `login`. | **PASSOU** |

---

## Observações e Pendências para a Sprint 4
- **Pontos de Melhoria:** Integrar API real em substituição aos mocks JSON de roçadas e usuários.
- **Estabilidade:** Nenhum crash ou travamento observado durante a execução dos testes principais.
- **Retorno da Motiva** Levar em conta o feedback e informações retornadas pela Motiva.