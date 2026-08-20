const common = {
  requireModule: ['tsx'],
  format: ['progress', 'html:cucumber-report.html', 'json:cucumber-report.json'],
  formatOptions: { snippetInterface: 'async-await' },
  publishQuiet: true
};

const ui = {
  ...common,
  require: ['features/step_definitions/checkout.steps.ts', 'support/hooks.ts'],
  paths: ['features/checkout.feature'],
  format: ['progress', 'html:cucumber-report.html', 'json:cucumber-report.json', '@cucumber/pretty-formatter']
};

const api = {
  ...common,
  require: ['features/step_definitions/api-user.steps.ts', 'support/api-hooks.ts'],
  paths: ['features/api-user.feature']
};

module.exports = { default: ui, ui, api };
