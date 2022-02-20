'use strict'

const Subscription = require('egg').Subscription;

class getInfo extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '10s',
      // 框架提供的定时任务默认支持两种类型，worker 和 all。
      // worker：每台机器上只有一个 worker 会执行这个定时任务，每次执行 worker 的选择是随机的。
      // all：每台机器上的每个 worker 都会执行这个定时任务。
      type: 'worker',
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    console.log('定时任务', Date.now());
  }
}

module.exports = getInfo;

// 可简写为
// module.exports = {
//   schedule: {
//     interval: '1m', // 1 分钟间隔
//     type: 'all', // 指定所有的 worker 都需要执行
//   },
//   async task(ctx) {
//     const res = await ctx.curl('http://www.api.com/cache', {
//       dataType: 'json',
//     });
//     ctx.app.cache = res.data;
//   },
// };
// 这个定时任务会在每一个 Worker 进程上每 1 分钟执行一次，将远程数据请求回来挂载到 app.cache 上。
