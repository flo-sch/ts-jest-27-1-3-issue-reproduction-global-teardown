const nxPreset = require('@nrwl/jest/preset');

module.exports = {
  ...nxPreset,
  coverageReporters: ['lcov', 'text-summary'],
  setupFilesAfterEnv: ['jest-extended/all'],
  testEnvironment: 'node',
};
