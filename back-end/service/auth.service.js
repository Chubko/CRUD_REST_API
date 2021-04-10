const { O_Auth } = require('../database/model');

module.exports = {
    createTokens: (tokens) => O_Auth.create(tokens),

    findToken: (token) => O_Auth.findOne(token).populate('_user_id'),

    deleteToken: (token) => O_Auth.findOneAndDelete(token),

    reIssueTokens: (tokens, userId) => O_Auth.findOneAndUpdate({ _id: userId },
        { $set: { access_token: tokens.access_token, refresh_token: tokens.refresh_token } })
};
