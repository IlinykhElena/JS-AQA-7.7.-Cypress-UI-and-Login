const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "7m2end",
  e2e: {
    baseUrl: "http://qamid.tmweb.ru/client/index.php",
    retries: {
      openMode: 1,
    },

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
