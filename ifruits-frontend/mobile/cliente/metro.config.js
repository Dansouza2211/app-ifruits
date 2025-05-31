const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configuração necessária para o NativeWind
config.resolver.assetExts.push('css');

module.exports = config; 