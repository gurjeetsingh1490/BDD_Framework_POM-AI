require('ts-node/register');

module.exports = {
  default: {
    paths: ['src/features/demo1.feature'],
    require: ['src/steps/**/*.ts', 'src/hooks/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress', 'html:test-results/demo1-report.html'],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    parallel: 1
  }
};