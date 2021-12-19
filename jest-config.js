module.exports = {
    roots: ['/src'],
    clearMocks: true,
    collectCoverageFrom: ['<rootDir>/src/**/*.spec.ts'],
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    testEnvironment: 'node',
    testTimeout: 20000,
    transform: {
      "^.+\\.(t|j)s$": "ts-jest"
    }
  };