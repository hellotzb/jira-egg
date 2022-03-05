/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1645238045465_8937';

  // add your middleware config here
  config.middleware = ['middlewareTest'];
  // 对应 middlewareTest中间件的options参数
  config.middlewareTest = {
    type: 'all',
  };
  config.auth = {
    // include: ['/checkout'], // 自定义属性，插件处理include数组内的地址才需要使用auh插件
  };
  // 防御CSRF攻击，进行Referer 验证，接口只允许allowHosts白名单内的referer访问
  config.allowHosts = ['localhost:8000', '127.0.0.1:8000'];
  config.interfaceLimit = {
    maxCount: 3, // 最多请求个数
    time: 3 * 1000, // 间隔时间
  };
  config.interfaceCache = {
    expire: 60 * 60 * 24, // redis缓存过期时间
    include: ['/api/user/detail'], // 需要缓存的接口
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  // config.static = {
  // prefix: '/assets/', 更改默认静态资源路径（请求路径）
  // dir: path.join(appInfo.baseDir, "app/assets") 更改默认静态资源路径（资源存放位置）
  // }

  // 重启服务会丢失session！！！建议保存在redis中
  config.session = {
    key: 'EGG_SESSION',
    // 其他参数和cookie中参数一致
    httpOnly: true,
    maxAge: 1000 * 60 * 60, // 缓存时间1小时
  };

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '123456',
      // 数据库名
      database: 'egg_house',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'egg_house',
    define: {
      timestamps: false, // 不需要sequelize自动添加时间相关字段
      freezeTableName: true, // 冻结表名称，使用原始表名称
    },
  };

  config.jwt = {
    secret: 'hellotzb', // jwt密钥
  };

  exports.view = {
    mapping: {
      // '.ejs': 'ejs',
      '.html': 'ejs',
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    salt: 'tzbweb', // 防止md5加密后被反解密，进行加盐处理
    redisExpire: 60 * 60 * 24, // redis缓存时间
  };

  return {
    ...config,
    ...userConfig,
  };
};
