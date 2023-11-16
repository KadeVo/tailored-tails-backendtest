"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cartItemSchema = new mongoose_1.default.Schema({
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
    },
    item_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    total_price: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
});
const cartItem = mongoose_1.default.model('CartItem', cartItemSchema);
exports.default = cartItem;
