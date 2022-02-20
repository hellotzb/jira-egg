'use strict';

module.exports = (options) => {
  // options 对应 config.middlewareTest 的配置
  return async (ctx, next) => {
    console.log('middleware-test start', options);
    await next();
    console.log('middleware-test end');
  };
};
