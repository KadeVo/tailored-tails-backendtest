"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemRouter = void 0;
const express_1 = __importDefault(require("express"));
const items_1 = __importDefault(require("../schemas/items"));
const router = express_1.default.Router();
exports.ItemRouter = router;
router.post('/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newItem = new items_1.default({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            rating: req.body.rating,
            stock: req.body.stock,
        });
        const createdItem = yield newItem.save();
        res.json(createdItem);
    }
    catch (error) {
        console.log(error);
        res.status(500);
    }
}));
router.delete('/items/:itemId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const itemId = req.params.itemId;
    const item = yield items_1.default.findByIdAndDelete(itemId);
    res.json(item);
}));
