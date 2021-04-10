const router = require('express').Router();

const { userController } = require('../controller');
const { authMiddleware, fileMiddleware, userMiddleware } = require('../middleware');

router.get('/', userController.getAllUsers);

router.post(
    '/',
    userMiddleware.isUserValid,
    fileMiddleware.checkFile,
    fileMiddleware.checkAvatar,
    userController.createUser
);

router.post(
    '/confirm',
    userMiddleware.checkConfirmToken,
    userController.confirmRegistration
);

router.post(
    '/password/forgot',
    userMiddleware.isUserExist,
    userController.forgotPassword
);
router.post(
    '/password/reset',
    userMiddleware.checkResetToken,
    userController.resetPassword
);

router.use(
    '/:userId', userMiddleware.isIdValid,
    authMiddleware.isUserActive,
    authMiddleware.checkAccessToken
);

router.get('/:userId', userController.findUserById);

router.put(
    '/:userId',
    fileMiddleware.checkFile,
    fileMiddleware.checkAvatar,
    userController.updateUserById
);

router.delete('/:userId', userController.deleteUserById);

module.exports = router;
