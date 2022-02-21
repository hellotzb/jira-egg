'use strict';

module.exports = options => {
  return async (ctx, next) => {
    const url = ctx.request.url;
    console.log('url', url);
    const user = ctx.session.user;
    const isNeedAuth = options.include.some(item => {
      return url.startsWith(item);
    });

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
