'use strict';

const Controller = require('egg').Controller;

class TestController extends Controller {
  async index() {
    const { ctx } = this;
    await new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
    ctx.body = ctx.helper.machineInfo();
  }

  async validate() {
    const { ctx } = this;
    const rule = {
      name: 'string',
      age: { type: 'int', max: 200 },
      gender: ['male', 'female'],
      birthday: { type: 'date', required: false },
    };
    // validate(rule[, data])可以传递自己处理过的数据，默认使用 this.request.body
    // 校验失败自动返回 422 响应
    ctx.validate(rule);
    ctx.body = 'success';
  }

  async login() {
    const { ctx } = this;
    const body = ctx.request.body;
    // 设置cookie
    ctx.cookies.set('user', JSON.stringify(body));
    // 设置session
    ctx.session.user = body; // 默认生成一个key值存放加密后的信息在cookie中，key值可通过config配置

    ctx.body = {
      status: 200,
      data: body,
    };
  }

  async home() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async ssr() {
    const { ctx } = this;
    await ctx.render('checkout.html', {
      data: 'world',
      list: ['java', 'python', 'javascript'],
    });
  }
}

module.exports = TestController;
