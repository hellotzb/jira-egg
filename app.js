'use strict';

module.exports = app => {
  // 框架和插件不支持在 config.default.js 中匹配 middleware
  // 应用层定义的中间件（app.config.appMiddleware）和框架默认中间件（app.config.coreMiddleware）都会被加载器加载，并挂载到 app.middleware 上。
  const mids = app.config.coreMiddleware;
  app.config.coreMiddleware = [
    ...mids,
    'interfaceLimit',
    'allowHosts',
    'notFound',
    'auth',
  ];
};
