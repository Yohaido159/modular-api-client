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
// 66a51adc-df91-4944-8d90-1678c343d350
