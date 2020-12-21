const path = require('path')

module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/src', '<rootDir>/test'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testRegex: '(/test/.*.(test|spec)).(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  coveragePathIgnorePatterns: ['(test/.*.mock).(jsx?|tsx?)$'],
  verbose: true,
  projects: ['<rootDir>'],
  coverageDirectory: '<rootDir>/coverage/',
  moduleNameMapper: {
    '@mimir/(.+)$': path.join(__dirname, '/shared/$1/src')
  }
}
