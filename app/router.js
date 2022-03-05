'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const userExist = app.middleware.userExist();
  // test
  router.redirect('/', '/user', 302);
  router.get('/checkout', controller.checkout.home);
  router.get('/checkout/test', controller.checkout.index);
  router.post('/checkout/validate', controller.checkout.validate);
  router.post('/checkout/login', controller.checkout.login);
  router.get('/checkout/ssr', controller.checkout.ssr);
  router.get('/user', controller.user.index);

  // prod
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  // 使用userExit的中间件
  router.post('/api/user/detail', userExist, controller.user.detail);
  router.post('/api/user/logout', controller.user.logout);
};
