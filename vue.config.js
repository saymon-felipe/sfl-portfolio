const fs = require('fs');
const path = require('path');

module.exports = {
  transpileDependencies: true,
  devServer: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, './localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, './localhost-cert.pem')),
    },
    host: '0.0.0.0', // Permite acesso de qualquer dispositivo na rede
    allowedHosts: 'all', // Permite qualquer host (dispositivo na rede local)
    port: 8080,
  },
};
