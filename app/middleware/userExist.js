'use strict';

module.exports = options => {
  // options 对应 config.userExist 的配置
  return async (ctx, next) => {
    const user = await ctx.service.user.getUser(ctx.username);
    if (!user) {
      ctx.body = {
        status: 500,
        errMsg: '用户不存在',
      };
      return;
    } else {
      await next();
    }
  };
};
