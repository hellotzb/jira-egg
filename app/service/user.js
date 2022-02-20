'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  // 新增：app.mysql.insert('house', params);
  // 更新：app.mysql.update('house', params);
  // 删除：app.mysql.delete('house', params);
  async testRetrieve() {
    try {
      const { app } = this;
      // 查询整张表的数据
      // const res = await app.mysql.select('house');
      // 查询整张表的数据
      const res = await app.mysql.get('house', { id: 1 });
      return res;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

module.exports = UserService;
