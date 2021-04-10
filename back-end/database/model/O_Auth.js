const { model, Schema } = require('mongoose');

const { databaseTables: { O_AUTH, USER } } = require('../../constant');

const oAuthScheme = new Schema({
    access_token: { type: String },
    refresh_token: { type: String },
    confirm_token: { type: String },
    reset_token: { type: String },
    _user_id: { type: Schema.Types.ObjectId, ref: USER }
}, { timestamps: true });

module.exports = model(O_AUTH, oAuthScheme);
