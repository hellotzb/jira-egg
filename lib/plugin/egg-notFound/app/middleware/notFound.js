'use strict';

module.exports = options => {
  return async (ctx, next) => {
    const routeMatched = ctx.app.router.stack.filter(item =>
      item.regexp.test(ctx.request.url)
    );
    if (routeMatched.length) {
      await next();
    } else {
      ctx.body = {
        status: 404,
        errMsg: ctx.request.url + '接口不存在',
      };
    }
  };
};
