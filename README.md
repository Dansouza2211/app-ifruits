# Ifruits - Sistema Completo de Delivery

## 📱 Visão Geral

O Ifruits é um sistema completo de delivery composto por aplicativos mobile para clientes e entregadores, além de painéis administrativos web para lojistas e administradores gerais.

Este projeto é uma implementação front-end, oferecendo uma experiência moderna e interativa para todos os usuários do ecossistema Ifruits.

## 🔗 Repositório

O código fonte está disponível no GitHub:
https://github.com/Dansouza2211/app-ifruits

## 🧰 Estrutura do Projeto

O projeto segue uma arquitetura de monorepo, organizada da seguinte forma:

```
/ifruits-frontend
├── /web               # Painel administrativo React (Vite + Tailwind + Framer Motion)
│   └── /painel-parceiro  # Painel para lojistas parceiros
├── /mobile
│   ├── /cliente       # App do cliente (React Native com Expo SDK 53)
│   └── /entregador    # App do entregador (React Native com Expo SDK 53)
└── /shared
    ├── /components    # Componentes reutilizáveis entre projetos
    ├── /assets        # Ícones, imagens, fontes
    ├── /styles        # Tailwind config, globais
    └── /utils         # Funções auxiliares, helpers, mocks
```

## 🚀 Tecnologias Utilizadas

### Aplicativos Mobile (Cliente e Entregador)

- **Framework**: React Native 0.79.2
- **SDK**: Expo SDK 53
- **Estilização**: NativeWind / TailwindCSS
- **Navegação**: React Navigation 7.x
- **Componentes Visuais**:
  - Expo Image
  - React Native Maps
  - React Native Vector Icons
  - React Native SVG
  - Lottie para animações
- **Gerenciamento de Estado**: Context API e Hooks
- **Armazenamento Local**: AsyncStorage

### Painel Administrativo Web

- **Framework**: React 18.2
- **Build Tool**: Vite 4.x
- **Estilização**: TailwindCSS 3.3.3
- **Navegação**: React Router DOM 6.15
- **Animações**: Framer Motion 10.16
- **Visualização de Dados**: Chart.js / React-Chartjs-2
- **Ícones**: Lucide React, HeroIcons
- **Requisições HTTP**: Axios

## ⚙️ Pré-requisitos

- Node.js (v18+)
- npm ou yarn
- Para desenvolvimento mobile:
  - Expo CLI
  - Android Studio (para emuladores Android)
  - Xcode (para emuladores iOS - apenas macOS)
  - Ou dispositivo físico com o aplicativo Expo Go instalado

## 🔧 Como Iniciar os Projetos

### Painel Administrativo Web (Lojista)

```bash
# Navegue até a pasta do painel parceiro
cd ifruits-frontend/web/painel-parceiro

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O painel administrativo estará disponível em `http://localhost:5173` (ou outra porta indicada no terminal).

### Aplicativo Mobile do Cliente

```bash
# Navegue até a pasta do aplicativo cliente
cd ifruits-frontend/mobile/cliente

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento com Expo
npm start

# Para iniciar diretamente em um emulador específico
npm run android  # Para Android
npm run ios      # Para iOS (apenas macOS)
```

### Aplicativo Mobile do Entregador

```bash
# Navegue até a pasta do aplicativo entregador
cd ifruits-frontend/mobile/entregador

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento com Expo
npm start

# Para iniciar diretamente em um emulador específico
npm run android  # Para Android
npm run ios      # Para iOS (apenas macOS)
```

## 📱 Executando nos Dispositivos

Pode executar os aplicativos mobile diretamente em dispositivo físico usando o aplicativo Expo Go:

1. Instale o Expo Go da App Store (iOS) ou Google Play Store (Android)
2. Escaneie o código QR exibido no terminal após executar `npm start`
3. O aplicativo será carregado diretamente em seu dispositivo

Pode executar utilizando emulador, caso tenha. Dentre as opções de inicialização, apertar a tecla "a" para iniciar o emulador.

## 🎨 Recursos e Funcionalidades

### Aplicativo do Cliente
- Autenticação de usuários
- Navegação por categorias
- Listagem de produtos
- Detalhes de produtos
- Carrinho de compras
- Finalização de pedidos
- Acompanhamento de entrega
- Histórico de pedidos
- Perfil do usuário

### Aplicativo do Entregador
- Autenticação de entregador
- Visualização de entregas disponíveis
- Aceitação de entregas
- Navegação para endereço de entrega
- Confirmação de entrega
- Histórico de entregas
- Dashboard de ganhos

### Painel do Lojista
- Gerenciamento de produtos
- Controle de estoque
- Visualização de pedidos
- Estatísticas de vendas
- Relatórios financeiros
- Gestão de informações da loja

## 🧪 Dados Mock

Este projeto utiliza arquivos JSON para simular a comunicação com API. Os dados mock estão disponíveis na pasta `/shared/utils`.
