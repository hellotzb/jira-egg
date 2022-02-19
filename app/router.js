'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.checkout.home);
  router.get('/test', controller.checkout.index);
  router.post('/validate', controller.checkout.validate);
};
