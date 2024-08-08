module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(test).[jt]s?(x)'],
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
        'lib/**/*.js',
        '!lib/**/*.test.js',
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['json', 'html', 'text']
};