const { resolve } = require('path')
const root = resolve(__dirname)

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testTimeout: 7000,
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/src/modules/database/',
    '/src/server/',
    '/src/modules/index.ts',
  ],
  coverageProvider: 'v8',
  coverageReporters: [
    'json',
    'text',
    'lcov',
    'clover'
  ],
  displayName: 'root-tests',
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1'
  },
  preset: 'ts-jest',
  rootDir: root,
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/**/*.(test|spec).ts'
  ],
  testPathIgnorePatterns: [
    '/node_modules/'
  ]
}