const path = require('path');
const Runner = require('jscodeshift/src/Runner.js');

const { updateDependencies } = require('./utils');

module.exports = function (folder) {
  const modspath = [ __dirname, '..', 'codemods' ];
  const opts = {
    path: [ 'src/', 'lib/', 'test/' ],
    verbose: 0
  };

  return updateDependencies(folder)
    .then(() => {
      const run = mod => Runner.run(mod, opts.path, opts);

      return run(path.join(...modspath, 'remove-hooks.js'))
        .then(() => run(path.join(...modspath, 'map-modulenames.js')))
        .then(() => run(path.join(...modspath, 'expressify.js')))
        .then(() => run(path.join(...modspath, 'remove-filters.js')));
    });
};