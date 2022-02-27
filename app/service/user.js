'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  // 新增：app.mysql.insert('house', params);
  // 更新：app.mysql.update('house', params);
  // 删除：app.mysql.delete('house', params);
  async testRetrieve() {
    try {
      const { app } = this;
      // egg-mysql 查询整张表的数据
      // const res = await app.mysql.select('house');
      // egg-mysql 查询表对应id为1的数据
      const res = await app.mysql.get('house', { id: 1 });

      // egg-sequelize 查询整张表数据
      // const res = await app.model.User.findAll();
      return res;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getUser(username, password) {
    const { ctx } = this;
    try {
      // 注册接口getUser不需要根据密码查询，登陆接口getUser需要根据密码查询
      const res = await ctx.model.User.findOne({
        where: password
          ? { username, password: ctx.helper.encryptedPwd(password) }
          : { username },
      });
      return res;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async addUser(params) {
    const { ctx } = this;
    try {
      const res = await ctx.model.User.create(params);
      return res;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

module.exports = UserService;
