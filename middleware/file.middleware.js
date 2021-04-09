const { statusCodes } = require('../constant');
const { PHOTO_MAX_SIZE, PHOTOS_MIMETYPES } = require('../constant/constants');
const { errorMessages } = require('../error');
const ErrorHandler = require('../error/error.handler');

module.exports = {
    checkFile: (req, res, next) => {
        try {
            const { files } = req;

            const photos = [];

            if (files) {
                const allFiles = Object.values(files);

                for (let i = 0; i < allFiles.length; i++) {
                    const { mimetype, size } = allFiles[i];

                    if (PHOTOS_MIMETYPES.includes(mimetype)) {
                        if (PHOTO_MAX_SIZE < size) {
                            throw new ErrorHandler(
                                statusCodes.BAD_REQUEST,
                                errorMessages.TOO_BIG_FILE.customCode,
                                errorMessages.TOO_BIG_FILE.message
                            );
                        }

                        photos.push(allFiles[i]);
                    } else {
                        throw new ErrorHandler(
                            statusCodes.BAD_REQUEST,
                            errorMessages.WRONG_FILE.customCode,
                            errorMessages.WRONG_FILE.message
                        );
                    }
                }
            }

            req.photos = photos;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAvatar: (req, res, next) => {
        try {
            if (req.photos.length > 1) {
                throw new ErrorHandler(
                    statusCodes.BAD_REQUEST,
                    errorMessages.LIMITED_SIZE.customCode,
                    errorMessages.LIMITED_SIZE.message
                );
            }

            [req.avatar] = req.photos;

            next();
        } catch (e) {
            next(e);
        }
    }
};
