'use strict';

const { Controller } = require('egg');
const md5 = require('md5');

class Usercontroller extends Controller {
  async index() {
    const { ctx } = this;
    const res = await ctx.service.user.testRetrieve();
    ctx.body = res;
  }
  async register() {
    const { ctx, app } = this;
    const reqParams = ctx.request.body;
    const user = await ctx.service.user.getUser(reqParams.username);
    if (user) {
      ctx.body = {
        status: 500,
        errMsg: '用户已经存在',
      };
      return;
    }

    // 注册用户需要对密码处理：使用md5加密。md5可以进行反解密，需要进行加盐处理
    // const res = await ctx.model.User.add(reqParams);
    const res = await ctx.service.User.add({
      ...reqParams,
      password: md5(reqParams.password + app.config.salt),
      createTime: ctx.helper.formatTime(),
    });
    if (res) {
      // 返回值需要排除密码等敏感项
      ctx.body = {
        status: 200,
        data: {
          ...ctx.helper.unPick(res.dataValues, ['password']),
          createTime: new Date(res.createTime).getTime(),
        },
      };
    } else {
      ctx.body = {
        status: 500,
        errMsg: '注册失败',
      };
    }
  }
}

module.exports = Usercontroller;
