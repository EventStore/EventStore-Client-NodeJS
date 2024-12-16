module.exports = {
  testTimeout: 60_000,
  preset: 'ts-jest',
  testMatch: ['**/src/**/*.test.ts', '**/src/samples/*.ts'],
  globalSetup: '<rootDir>/src/utils/preflight.ts',
  moduleNameMapper: {
    '@test-utils': '<rootDir>/src/utils',
    "^@kurrent/db-client$": "<rootDir>/../db-client/dist/index",
    "^@kurrent/db-client/(.*)$": "<rootDir>/../db-client/$1",
    "^@kurrent/opentelemetry$": "<rootDir>/../opentelemetry/dist/index",
    "^@kurrent/opentelemetry/(.*)$": "<rootDir>/../opentelemetry/$1",
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
    },
  },
};
