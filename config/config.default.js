/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
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

  config.security = {
    csrf: {
      enable: false,
    },
  };

  // config.static = {
  // prefix: '/assets/', 更改默认静态资源路径（请求路径）
  // dir: path.join(appInfo.baseDir, "app/assets") 更改默认静态资源路径（资源存放位置）
  // }

  config.session = {
    key: 'EGG_SESSION',
    // 其他参数和cookie中参数一致
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
