/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-node',
  transform: {
    '^.+\\.(js|ts)?$': 'ts-jest',
  },
  collectCoverage: true,
  coverageReporters: ['json', 'lcov'],
};
