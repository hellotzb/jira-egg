'use strict';

// 防御CSRF（跨域请求伪造）攻击：Referer 验证（只接受本站的请求，服务器才做响应;如果不是，就拦截）
// options -> config.default.js -> config.allowHosts
module.exports = options => {
  return async (ctx, next) => {
    const { referer } = ctx.request.header;
    // 如果以接口形式请求后端会携带referer，如果使用eggjs模版引擎就不会有referer
    if (referer) {
      const url = new URL(referer);
      if (options.includes(url.host)) {
        await next();
      } else {
        ctx.body = {
          status: 403,
          errmsg: `host ${url.host} 不在请求白名单中`,
        };
      }
    } else {
      await next();
    }
  };
};
