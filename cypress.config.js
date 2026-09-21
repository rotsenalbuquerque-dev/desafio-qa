const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev',

    setupNodeEvents(on, config) {
      // Eventos do Node podem ser configurados aqui
    },
  },

  expose: {
    apiUrl: 'https://serverest.dev'
  }
})