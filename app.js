'use strict';

module.exports = app => {
  // 框架和插件不支持在 config.default.js 中匹配 middleware
  app.config.coreMiddleware.unshift('auth');
};
