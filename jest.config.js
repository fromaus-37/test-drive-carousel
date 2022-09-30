module.exports = {
  setupFilesAfterEnv: ['./src/tests/jestSetup.js'],
  testEnvironment: 'jsdom',
  verbose: true,
  testEnvironmentOptions: {
    url: 'http://localhost/',
  },
};
