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
      // 使用jwt改造接口
      const token = ctx.helper.jwtSign({
        id: user.id,
        username: user.username,
      });
      ctx.body = {
        status: 200,
        data: {
          ...ctx.helper.unPick(user.dataValues, ['passwords']),
          createTime: new Date(user.createTime).getTime(),
          token,
        },
      };
    } else {
      ctx.body = {
        status: 500,
        errMsg: '该用户不存在',
      };
    }
  }
  async detail() {
    // 使用userExist中间件处理用户不存在的情况
    const { ctx } = this;
    ctx.body = {
      status: 200,
      data: {
        ...ctx.helper.unPick(user.dataValues, ['passwords']),
        createTime: new Date(user.createTime).getTime(),
        token,
      },
    };
  }
  async logout() {
    const { ctx } = this;
    try {
      ctx.session[ctx.username] = null;
      ctx.body = {
        status: 200,
        data: 'ok',
      };
    } catch (error) {
      ctx.body = {
        status: 500,
        errMsg: '退出登陆失败',
      };
    }
  }
}

module.exports = Usercontroller;
