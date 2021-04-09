const cron = require('node-cron');

const deleteTokens = require('./deleteTokens');

module.exports = () => {
    cron.schedule('0 0 0 1 * *', () => {
        deleteTokens();
    });
};
