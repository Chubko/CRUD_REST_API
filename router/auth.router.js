const router = require('express').Router();

const { authController } = require('../controller');
const { authMiddleware } = require('../middleware');

router.post(
    '/',
    authMiddleware.isUserRegistered,
    authController.authUser
);

router.post(
    '/refresh_token',
    authMiddleware.checkRefreshToken,
    authController.refreshTokens
);

module.exports = router;
