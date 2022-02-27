'use strict';
// 模型名称尽量和表名称保持一致

// 这个 Model 可以在 Controller 和 Service 中通过 app.model.User / ctx.model.User 访问到
module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING(20),
    password: STRING(64),
    avatar: TEXT('long'),
    phone: STRING(20),
    sign: STRING(300),
    createTime: DATE,
    createTime: DATE,
  });

  return User;
};
