'use strict';

// 防御海量接口请求攻击（通过短时间内向服务器发起海量的请求，耗尽服务器资源，使服务器崩溃）
// 接口缓存，将常用的接口进行缓存，减少对数据库查询次数（将接口返回的值保存在Redis中）
/**
 * 1. 接口地址作为redis中的key
 * 2. 查询redis，如果有缓存，返回缓存接口，如果没有缓存，将接口缓存到redis中
 */

// options -> config.default.js -> config.interfaceCache
module.exports = options => {
  return async (ctx, next) => {
    await next();
    // const { expire = 60 * 60 * 24, include = [] } = options;
    // const { url } = ctx.request;
    // const cache = await ctx.app.redis.get(url);
    // if (include.includes(url)) {
    //   if (cache) {
    //     ctx.body = JSON.parse(cache);
    //     return;
    //   } else {
    //     await next();
    //     try {
    //       await ctx.app.redis.set(
    //         url,
    //         JSON.stringify(ctx.response.body),
    //         'EX',
    //         expire
    //       );
    //     } catch (err) {
    //       console.log('缓存接口失败', err);
    //     }
    //   }
    // } else {
    //   await next();
    // }
  };
};
