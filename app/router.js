'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // test
  router.redirect('/', '/user', 302);
  router.get('/checkout', controller.checkout.home);
  router.get('/checkout/test', controller.checkout.index);
  router.post('/checkout/validate', controller.checkout.validate);
  router.post('/checkout/login', controller.checkout.login);
  router.get('/user', controller.user.index);

  // prod
  route.post('/api/user/register', controller.user.register);
  route.post('/api/user/login', controller.user.login);
  route.post('/api/user/detail', controller.user.detail);
  route.post('/api/user/logout', controller.user.logout);
};
