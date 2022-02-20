'use strict';

const path = require('path');

exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.auth = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-auth'),
};
