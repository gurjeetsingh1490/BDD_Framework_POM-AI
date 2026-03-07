require('ts-node/register');

module.exports = {
  default: {
    paths: ['src/features/formRegistration.feature'],
    require: ['src/steps/**/*.ts', 'src/hooks/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress', 'html:test-results/form-report.html'],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    parallel: 1
  }
};