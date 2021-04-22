module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^Ts(.*)$': '<rootDir>/src/ts/$1',
    '^UI(.*)$': '<rootDir>/src/ts/View/UI/$1',
    '^Helpers(.*)$': '<rootDir>/src/ts/helpers/$1',
  },
};
