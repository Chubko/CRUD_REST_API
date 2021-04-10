const {
    constants, dirNames: { PHOTOS, USER }, emailActions, statusCodes, userStatus
} = require('../constant');
const ErrorHandler = require('../error/error.handler');
const { errorMessages } = require('../error');
const {
    attachmentDirBuilder, nameNormalizer, passwordHasher, tokenizer
} = require('../helper');
const { userMessage } = require('../message');
const {
    authService, emailService, fileService, userService
} = require('../service');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { avatar, body: { email, name, password } } = req;

            const hashPassword = await passwordHasher.hash(password);

            const nameNormalized = nameNormalizer.nameNormalizer(name);

            const user = await userService.createUser({ ...req.body, name: nameNormalized, password: hashPassword });

            const { confirm_token } = tokenizer();

            await authService.createTokens({ confirm_token, _user_id: user.id });

            if (avatar) {
                const { uploadPath } = await attachmentDirBuilder(avatar, PHOTOS, user.id, USER);

                await userService.updateUserById(user._id, { avatar: uploadPath });
            }

            await emailService.sendEmail(email, emailActions.USER_CREATED, { token: confirm_token });

            res.status(statusCodes.CREATED).json(user);
        } catch (e) {
            next(e);
        }
    },

    confirmRegistration: async (req, res, next) => {
        try {
            const { body: { prefLang = 'en' }, userId } = req;
            const confirm_token = req.get(constants.AUTHORIZATION);

            const user = await userService.findUserById(userId);

            if (user.status !== userStatus.PENDING) {
                throw new ErrorHandler(
                    statusCodes.BAD_REQUEST,
                    errorMessages.USER_ACTIVATED.customCode,
                    errorMessages.USER_ACTIVATED.message
                );
            }

            await userService.updateUserById(userId, { status: userStatus.ACTIVE });

            await authService.deleteToken({ confirm_token });

            res.json(userMessage.ACTIVATED[prefLang]);
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findAllUsers(req.query);

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    findUserById: (req, res, next) => {
        try {
            const { user } = req;

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const {
                avatar, body, body: { prefLang = 'en' }, user: { email }, userId
            } = req;

            if (avatar) {
                await fileService.deleteFile(USER, userId);

                const { uploadPath } = await attachmentDirBuilder(avatar, PHOTOS, userId, USER);

                await userService.updateUserById(userId, { avatar: uploadPath });
            }

            await userService.updateUserById(userId, body);

            await emailService.sendEmail(email, emailActions.USER_CHANGED, { userEmail: email });

            res.json(userMessage.UPDATED[prefLang]);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const { user: { _id, email } } = req;

            await userService.updateUserById(_id, { status: userStatus.BLOCKED });

            await fileService.deleteFile(USER, _id);

            await emailService.sendEmail(email, emailActions.USER_DELETED, { userEmail: email });

            res.status(statusCodes.DELETED).json(userMessage.DELETED);
        } catch (e) {
            next(e);
        }
    },

    forgotPassword: async (req, res, next) => {
        try {
            const { _id, email } = req.user;

            const { reset_token } = tokenizer();

            await authService.createTokens({ reset_token, _user_id: _id });

            await emailService.sendEmail(email, emailActions.FORGOT_PASSWORD, { token: reset_token });

            res.end();
        } catch (e) {
            next(e);
        }
    },

    resetPassword: async (req, res, next) => {
        try {
            const { body: { password }, userId } = req;

            const hashPassword = await passwordHasher.hash(password);

            await userService.updateUserById(userId, { password: hashPassword });

            res.end();
        } catch (e) {
            next(e);
        }
    },
};
