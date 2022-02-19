'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.checkout.home);
  router.get('/checkout/test', controller.checkout.index);
  router.post('/checkout/validate', controller.checkout.validate);
  router.post('/checkout/login', controller.checkout.login);
};
