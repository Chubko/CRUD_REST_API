const { emailActions } = require('../constant');

module.exports = {
    [emailActions.USER_CREATED]: {
        templateName: 'user-created',
        subject: 'Registration was successful!'
    },

    [emailActions.USER_DELETED]: {
        templateName: 'user-deleted',
        subject: 'Your account was deleted!'
    },

    [emailActions.USER_CHANGED]: {
        templateName: 'user-changed',
        subject: 'Your account was changed!'
    },

    [emailActions.FORGOT_PASSWORD]: {
        templateName: 'forgot-password',
        subject: 'Forgot your password?'
    },
};
