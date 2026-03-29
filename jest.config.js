/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: { jsx: 'react' } }],
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
