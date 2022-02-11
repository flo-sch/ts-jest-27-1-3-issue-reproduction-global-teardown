module.exports = {
  displayName: 'example-app-integration',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      // babelConfig: true,
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  globalSetup: '<rootDir>/jest/globalSetup.ts',
  globalTeardown: '<rootDir>/jest/globalTeardown.ts',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/example-app-integration',
};
