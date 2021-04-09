const { model, Schema } = require('mongoose');

const { databaseTables: { O_AUTH, USER }, userStatus } = require('../../constant');

const userScheme = new Schema({
    name: { type: String, required: true },
    age: { type: Number, min: 3, max: 100 },
    gender: { type: String },
    email: { type: String, required: true, unique: true },
    password: {
        type: String, required: true, maxlength: 100, select: false
    },
    avatar: { type: String },
    status: {
        type: String,
        required: true,
        default: userStatus.PENDING
    },
    tokens: { type: Schema.Types.ObjectId, ref: O_AUTH }
}, { timestamps: true });

module.exports = model(USER, userScheme);
