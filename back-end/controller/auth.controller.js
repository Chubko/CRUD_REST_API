const { passwordHasher, tokenizer } = require('../helper');
const { authService } = require('../service');

module.exports = {
    authUser: async (req, res, next) => {
        try {
            const { body: { password }, user } = req;

            await passwordHasher.compare(password, user.password);

            const { access_token, refresh_token } = tokenizer();

            await authService.createTokens({ access_token, refresh_token, _user_id: user.id });

            res.json({ access_token, refresh_token });
        } catch (e) {
            next(e);
        }
    },

    refreshTokens: async (req, res, next) => {
        try {
            const { user: { _id } } = req;

            const { access_token, refresh_token } = tokenizer();

            await authService.reIssueTokens({ access_token, refresh_token }, _id);

            res.json({ access_token, refresh_token });
        } catch (e) {
            next(e);
        }
    }
};
