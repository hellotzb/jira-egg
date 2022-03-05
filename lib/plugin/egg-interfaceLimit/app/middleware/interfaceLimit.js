'use strict';

// 防御海量接口请求攻击（通过短时间内向服务器发起海量的请求，耗尽服务器资源，使服务器崩溃）
// 限制3秒内最多允许3个接口请求
/**
 * 1. 设置计数器，每次请求+1，保存起始时间
 * 2. 超过3秒，计数器大于3则提示请求频繁，计数器清零，起始时间修改为当前时间
 * 3. 超过3秒，计数器小于3，计数器清零，起始时间修改为当前时间
 */
// options -> config.default.js -> config.interfaceLimit
module.exports = options => {
  const maxCount = options.maxCount || 3;
  const gapTime = options.time || 3 * 1000;
  let count = 0;
  let firstTime = new Date().getTime(); // 第一次请求接口的时间
  return async (ctx, next) => {
    if (new Date().getTime() - firstTime >= gapTime) {
      if (count >= maxCount) {
        count = 0;
        firstTime = new Date().getTime();
        ctx.body = {
          status: 500,
          errMsg: '请求太频繁',
        };
      } else {
        count = 0;
        firstTime = new Date().getTime();
        await next();
      }
    } else {
      count++;
      await next();
    }
  };
};
