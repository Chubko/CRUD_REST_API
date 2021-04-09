module.exports = {
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'ACCESS_SECRET',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'REFRESH_SECRET',
    JWT_CONFIRM_SECRET: process.env.JWT_CONFIRM_SECRET || 'CONFIRM_SECRET',
    JWT_RESET_SECRET: process.env.JWT_RESET_SECRET || 'RESET_SECRET',
    MONGO_URL: process.env.MONG0_URL || 'mongodb://localhost:27017/users',
    PORT: process.env.PORT || 5000,
    ROOT_EMAIL: process.env.ROOT_EMAIL || 'test@gmail.com',
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || '12345'
};
