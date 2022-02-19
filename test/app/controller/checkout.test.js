'use strict';

const { app } = require('egg-mock/bootstrap');
const os = require('os');

describe('controller test', () => {
  it('home', () => {
    return app.httpRequest().get('/').expect('hi, egg').expect(200);
  });

  it('test', () => {
    return app
      .httpRequest()
      .get('/test')
      .expect({
        memorys: os.totalmem() / 1024 / 1024 / 1024 + 'G',
        platform: os.platform(),
        cpus: os.cpus().length,
      })
      .expect(200);
  });

  it('validate', () => {
    // 会有csrf报错，可在config.default.js中关闭csrf security校验
    return app
      .httpRequest()
      .post('/validate')
      .send({
        name: 'zhangsan',
        age: 28,
        gender: 'male',
      })
      .expect('success')
      .expect(200);
  });
});
