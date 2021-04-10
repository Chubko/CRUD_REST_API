const jwt = require('jsonwebtoken');

const {
    JWT_ACCESS_SECRET, JWT_CONFIRM_SECRET, JWT_REFRESH_SECRET, JWT_RESET_SECRET
} = require('../configs/config');

module.exports = () => {
    const access_token = jwt.sign({}, JWT_ACCESS_SECRET, { expiresIn: '10m' });
    const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, { expiresIn: '7d' });
    const confirm_token = jwt.sign({}, JWT_CONFIRM_SECRET, { expiresIn: '24h' });
    const reset_token = jwt.sign({}, JWT_RESET_SECRET, { expiresIn: '24h' });

    return {
        access_token,
        refresh_token,
        confirm_token,
        reset_token
    };
};
