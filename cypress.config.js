const { defineConfig } = require("cypress");
// TODO https://github.com/cypress-io/cypress/issues/22146 - after this is fixed can switch back to ts configuration

module.exports = defineConfig({
  viewportHeight: 720,
  viewportWidth: 1280,
  retries: {
    runMode: 3,
    openMode: 0,
  },
  e2e: {
    modifyObstructiveCode: false,
    video: false,
    baseUrl: "http://localhost:3001",
  },
  chromeWebSecurity: false
});
