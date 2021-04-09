const { O_Auth } = require('../database/model');

module.exports = async () => {
    await O_Auth.deleteMany({
        createdAt: { $gte: (new Date() - 7 * 24 * 60 * 60 * 1000) }
    });
};
