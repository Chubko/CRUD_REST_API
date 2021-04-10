const jwt = require('jsonwebtoken');

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = require('../configs/config');
const { constants, statusCodes, userStatus } = require('../constant');
const ErrorHandler = require('../error/error.handler');
const { errorMessages } = require('../error');
const { authService, userService } = require('../service');

module.exports = {
    isUserRegistered: async (req, res, next) => {
        try {
            const { email } = req.body;

            const user = await userService.findOneUser({ email }).select('+password');

            if (!user) {
                throw new ErrorHandler(
                    statusCodes.BAD_REQUEST,
                    errorMessages.WRONG_EMAIL_OF_PASSWORD.customCode,
                    errorMessages.WRONG_EMAIL_OF_PASSWORD.message
                );
            }

            if (user.status === userStatus.BLOCKED) {
                throw new ErrorHandler(
                    statusCodes.BAD_REQUEST,
                    errorMessages.NOT_FOUND.customCode,
                    errorMessages.NOT_FOUND.message
                );
            }

            if (user.status === userStatus.PENDING) {
                throw new ErrorHandler(
                    statusCodes.BAD_REQUEST,
                    errorMessages.USER_NOT_CONFIRMED.customCode,
                    errorMessages.USER_NOT_CONFIRMED.message
                );
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserActive: (req, res, next) => {
        try {
            const { user } = req;

            if (user.status !== userStatus.ACTIVE) {
                throw new ErrorHandler(
                    statusCodes.BAD_REQUEST,
                    errorMessages.USER_NOT_CONFIRMED.customCode,
                    errorMessages.USER_NOT_CONFIRMED.message
                );
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(constants.AUTHORIZATION);

            if (!access_token) {
                throw new ErrorHandler(
                    statusCodes.BAD_REQUEST,
                    errorMessages.NO_TOKEN.customCode,
                    errorMessages.NO_TOKEN.message
                );
            }

            const tokens = await authService.findToken({ access_token });

            if (!tokens) {
                throw new ErrorHandler(
                    statusCodes.NOT_FOUND,
                    errorMessages.RECORD_NOT_FOUND.customCode,
                    errorMessages.RECORD_NOT_FOUND.message
                );
            }

            jwt.verify(access_token, JWT_ACCESS_SECRET, err => {
                if (err) {
                    throw new ErrorHandler(
                        statusCodes.UNAUTHORIZED,
                        errorMessages.NOT_VERIFIED_TOKEN.customCode,
                        errorMessages.NOT_VERIFIED_TOKEN.message
                    );
                }
            });

            req.userId = tokens._user_id._id;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const { email } = req.body;

            const refresh_token = req.get(constants.AUTHORIZATION);

            if (!refresh_token) {
                throw new ErrorHandler(
                    statusCodes.BAD_REQUEST,
                    errorMessages.NO_TOKEN.customCode,
                    errorMessages.NO_TOKEN.message
                );
            }

            const user = await userService.findOneUser({ email });

            if (!user) {
                throw new ErrorHandler(
                    statusCodes.NOT_FOUND,
                    errorMessages.RECORD_NOT_FOUND.customCode,
                    errorMessages.RECORD_NOT_FOUND.message
                );
            }

            if (user.refresh_token !== refresh_token) {
                throw new ErrorHandler(
                    statusCodes.UNAUTHORIZED,
                    errorMessages.NOT_VALID_TOKEN.customCode,
                    errorMessages.NOT_VALID_TOKEN.message
                );
            }

            jwt.verify(refresh_token, JWT_REFRESH_SECRET, err => {
                if (err) {
                    throw new ErrorHandler(
                        statusCodes.UNAUTHORIZED,
                        errorMessages.NOT_VERIFIED_TOKEN.customCode,
                        errorMessages.NOT_VERIFIED_TOKEN.message
                    );
                }
            });

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    }
};
