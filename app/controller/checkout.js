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
      gender: [ 'male', 'female' ],
      birthday: { type: 'date', required: false },
    };
    // validate(rule[, data])可以传递自己处理过的数据，默认使用 this.request.body
    ctx.validate(rule);
    ctx.body = 'success';
  }

  async home() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
}

module.exports = TestController;
