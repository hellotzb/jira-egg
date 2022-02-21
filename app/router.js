'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.redirect('/', '/user', 302);
  router.get('/checkout', controller.checkout.home);
  router.get('/checkout/test', controller.checkout.index);
  router.post('/checkout/validate', controller.checkout.validate);
  router.post('/checkout/login', controller.checkout.login);
  router.get('/user', controller.user.index);
};
