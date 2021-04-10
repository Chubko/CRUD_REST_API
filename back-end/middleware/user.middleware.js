const jwt = require('jsonwebtoken');

const { JWT_CONFIRM_SECRET, JWT_RESET_SECRET } = require('../configs/config');
const { constants, statusCodes } = require('../constant');
const ErrorHandler = require('../error/error.handler');
const { errorMessages } = require('../error');
const { authService, userService: { findOneUser, findUserById } } = require('../service');
const { userValidator } = require('../validator');

module.exports = {
    isIdValid: async (req, res, next) => {
        try {
            const { userId } = req.params;

            if (userId.length !== 24) {
                throw new ErrorHandler(
                    statusCodes.BAD_REQUEST,
                    errorMessages.ID_NOT_VALID.customCode,
                    errorMessages.ID_NOT_VALID.message
                );
            }

            const user = await findUserById(userId);

            if (!user) {
                throw new ErrorHandler(
                    statusCodes.BAD_REQUEST,
                    errorMessages.NOT_EXISTING_ID.customCode,
                    errorMessages.NOT_EXISTING_ID.message
                );
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserValid: async (req, res, next) => {
        try {
            const { email } = req.body;

            const { error } = userValidator.createUserValidator.validate(req.body);

            const user = await findOneUser({ email });

            if (user) {
                throw new ErrorHandler(
                    statusCodes.CONFLICT,
                    errorMessages.EMAIL_EXISTS.customCode,
                    errorMessages.EMAIL_EXISTS.message
                );
            }

            if (error) {
                throw new ErrorHandler(
                    statusCodes.BAD_REQUEST,
                    errorMessages.BAD_REQUEST.customCode,
                    error.details[0].message
                );
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkConfirmToken: async (req, res, next) => {
        try {
            const confirm_token = req.get(constants.AUTHORIZATION);

            if (!confirm_token) {
                throw new ErrorHandler(
                    statusCodes.BAD_REQUEST,
                    errorMessages.NO_TOKEN.customCode,
                    errorMessages.NO_TOKEN.message
                );
            }

            const token = await authService.findToken({ confirm_token });

            if (!token) {
                throw new ErrorHandler(
                    statusCodes.NOT_FOUND,
                    errorMessages.RECORD_NOT_FOUND.customCode,
                    errorMessages.RECORD_NOT_FOUND.message
                );
            }

            jwt.verify(confirm_token, JWT_CONFIRM_SECRET, err => {
                if (err) {
                    throw new ErrorHandler(
                        statusCodes.UNAUTHORIZED,
                        errorMessages.NOT_VERIFIED_TOKEN.customCode,
                        errorMessages.NOT_VERIFIED_TOKEN.message
                    );
                }
            });

            req.userId = token._user_id;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserExist: async (req, res, next) => {
        try {
            const { email } = req.body;

            const { error } = userValidator.emailValidator.validate({ email });

            if (error) {
                throw new ErrorHandler(
                    statusCodes.BAD_REQUEST,
                    errorMessages.BAD_REQUEST.customCode,
                    error.details[0].message
                );
            }

            const user = await findOneUser({ email });

            if (!user) {
                throw new ErrorHandler(
                    statusCodes.NOT_FOUND,
                    errorMessages.NOT_FOUND.customCode,
                    errorMessages.NOT_FOUND.message
                );
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkResetToken: async (req, res, next) => {
        try {
            const reset_token = req.get(constants.AUTHORIZATION);

            if (!reset_token) {
                throw new ErrorHandler(
                    statusCodes.BAD_REQUEST,
                    errorMessages.NO_TOKEN.customCode,
                    errorMessages.NO_TOKEN.message
                );
            }

            const token = await authService.findToken({ reset_token });

            if (!token) {
                throw new ErrorHandler(
                    statusCodes.NOT_FOUND,
                    errorMessages.RECORD_NOT_FOUND.customCode,
                    errorMessages.RECORD_NOT_FOUND.message
                );
            }

            jwt.verify(reset_token, JWT_RESET_SECRET, err => {
                if (err) {
                    throw new ErrorHandler(
                        statusCodes.UNAUTHORIZED,
                        errorMessages.NOT_VERIFIED_TOKEN.customCode,
                        errorMessages.NOT_VERIFIED_TOKEN.message
                    );
                }
            });

            req.userId = token._user_id;

            next();
        } catch (e) {
            next(e);
        }
    },

};
