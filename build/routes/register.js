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
exports.RegisterRouter = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const joi_1 = __importDefault(require("joi"));
const express_1 = __importDefault(require("express"));
const user_1 = require("../schemas/user");
const generateAuthToken_1 = __importDefault(require("../utils/generateAuthToken"));
const router = express_1.default.Router();
exports.RegisterRouter = router;
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(3).max(30).required(),
        email: joi_1.default.string().min(3).max(200).required().email(),
        password: joi_1.default.string().min(6).max(200).required(),
    });
    const { error } = schema.validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    let user = yield user_1.User.findOne({ email: req.body.email });
    if (user)
        return res.status(400).send('User Already Exists.');
    const { name, email, password } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    user = new user_1.User({
        name,
        email,
        password: hashedPassword
    });
    yield user.save();
    const token = (0, generateAuthToken_1.default)(user);
    res.send(token);
}));
