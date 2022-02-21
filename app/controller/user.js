'use strict';

const { Controller } = require('egg');

class Usercontroller extends Controller {
  async index() {
    const { ctx } = this;
    const res = await ctx.service.user.testRetrieve();
    ctx.body = res;
  }
}

module.exports = Usercontroller;
