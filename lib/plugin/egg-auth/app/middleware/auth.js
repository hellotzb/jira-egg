'use strict';

// options -> config.default.js -> config.auth
module.exports = options => {
  return async (ctx, next) => {
    const url = ctx.request.url;
    const token = ctx.request.get('token');
    const userToken = ctx.session[ctx.username]; // ctx.username需要在extends中扩展context.js
    const user = userToken ? userToken === token : userToken;
    const isNeedAuth = false;
    if (options.include && Array.isArray(options.include)) {
      isNeedAuth = options.include.some(item => {
        return url.startsWith(item);
      });
    }

    if (!user && isNeedAuth) {
      ctx.body = {
        status: 1001,
        errMsg: '用户未登录',
      };
    } else {
      await next();
    }
  };
};
