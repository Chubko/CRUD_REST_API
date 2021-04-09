module.exports = {
// BAD REQUEST
    BAD_REQUEST: {
        customCode: 4000,
        message: 'Bad request'
    },
    NOT_EXISTING_ID: {
        customCode: 4001,
        message: 'Id is not existing'
    },
    ID_NOT_VALID: {
        customCode: 4002,
        message: 'Id is not valid'
    },
    WRONG_EMAIL_OF_PASSWORD: {
        customCode: 4003,
        message: 'Wrong email or password!'
    },
    NO_TOKEN: {
        customCode: 4004,
        message: 'Token is required'
    },
    WRONG_ACTION: {
        customCode: 4005,
        message: 'Wrong email action'
    },
    TOO_BIG_FILE: {
        customCode: 4006,
        message: 'File is too big'
    },
    WRONG_FILE: {
        customCode: 4007,
        message: 'File is not invalid'
    },
    LIMITED_SIZE: {
        customCode: 4008,
        message: 'You can upload just one photo'
    },
    USER_ACTIVATED: {
        message: 'User is already activated',
        code: 4009
    },
    // UNAUTHORIZED
    NOT_VERIFIED_TOKEN: {
        customCode: 4011,
        message: 'Token is not verified'
    },
    NOT_VALID_TOKEN: {
        customCode: 4012,
        message: 'Token is not valid'
    },
    // FORBIDDEN
    ACCESS_FORBIDDEN: {
        customCode: 4031,
        message: 'Access is denied'
    },
    USER_NOT_CONFIRMED: {
        message: 'User is not confirmed',
        code: 4032
    },
    // NOT FOUND
    RECORD_NOT_FOUND: {
        customCode: 4041,
        message: 'Tokens are not found'
    },
    NOT_FOUND: {
        customCode: 4042,
        message: 'Record not found'
    },
    // CONFLICT
    EMAIL_EXISTS: {
        customCode: 4091,
        message: 'User with this email is already registered'
    }
};
