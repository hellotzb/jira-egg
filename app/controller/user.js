'use strict';

const { Controller } = require('egg');

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

    // 注册用户需要对密码处理：使用md5加密。
    // const res = await ctx.model.User.add(reqParams);
    const res = await ctx.service.User.add({
      ...reqParams,
      password: ctx.helper.encryptedPwd(reqParams.password),
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
  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    const user = await ctx.service.user.getUser(username, password);
    if (user) {
      // Session 的实现是基于 Cookie 的，默认配置下，用户 Session 的内容加密后直接存储在 Cookie 中的一个字段中，用户每次请求我们网站的时候都会带上这个 Cookie，我们在服务端解密后使用。
      ctx.session.userId = user.id;
      ctx.body = {
        status: 200,
        data: {
          ...ctx.helper.unPick(user.dataValues, ['passwords']),
          createTime: new Date(user.createTime).getTime(),
        },
      };
    } else {
      ctx.body = {
        status: 500,
        errMsg: '该用户不存在',
      };
    }
  }
}

module.exports = Usercontroller;
