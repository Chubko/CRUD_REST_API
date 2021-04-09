const bcrypt = require('bcrypt');

const { userMessage } = require('../message');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hashPassword, prefLang = 'en') => {
        const isPasswordEqual = await bcrypt.compare(password, hashPassword);

        if (!isPasswordEqual) {
            throw new Error(userMessage.WRONG_EMAIL_PASSWORD[prefLang]);
        }
    }
};
