"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const itemSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: [
            'Outfits for Cats',
            'Outfits for Dogs',
            'Body Piece',
            'Full Body',
            'Hat',
            'Accessories',
        ],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    stock: {
        type: Number,
        required: true,
    },
});
const itemModel = mongoose_1.default.model('Item', itemSchema);
exports.default = itemModel;
