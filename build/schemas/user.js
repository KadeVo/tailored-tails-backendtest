"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 200,
    },
    purchasedItems: [
        { type: mongoose_1.Schema.Types.ObjectId, ref: 'product', default: [] },
    ],
});
exports.User = (0, mongoose_1.model)('user', UserSchema);
