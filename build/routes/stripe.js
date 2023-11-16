"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.StripeRouter = void 0;
const express_1 = __importDefault(require("express"));
const stripe_1 = __importDefault(require("stripe"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const stripeKey = process.env.STRIPE_KEY;
if (!stripeKey) {
    throw new Error('Stripe key not provided');
}
const stripe = new stripe_1.default(stripeKey);
const router = express_1.default.Router();
exports.StripeRouter = router;
const YOUR_DOMAIN = 'https://tailored-tails.onrender.com';
router.post('/create-checkout-session', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const line_items = req.body.cartItems.map((item) => {
        return {
            price_data: {
                currency: 'nzd',
                product_data: {
                    name: item.name,
                    images: [item.imageUrl],
                    description: item.description,
                    metadata: {
                        id: item.id,
                    },
                },
                unit_amount: item.price * 100,
            },
            quantity: item.cartQuantity,
        };
    });
    const session = yield stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_address_collection: {
            allowed_countries: ['AU', 'NZ'],
        },
        shipping_options: [
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: 800,
                        currency: 'nzd',
                    },
                    display_name: 'Free shipping',
                    // Delivers between 5-7 business days
                    delivery_estimate: {
                        minimum: {
                            unit: 'business_day',
                            value: 5,
                        },
                        maximum: {
                            unit: 'business_day',
                            value: 7,
                        },
                    },
                },
            },
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: 1500,
                        currency: 'nzd',
                    },
                    display_name: 'Next day air',
                    // Delivers in exactly 1 business day
                    delivery_estimate: {
                        minimum: {
                            unit: 'business_day',
                            value: 1,
                        },
                        maximum: {
                            unit: 'business_day',
                            value: 1,
                        },
                    },
                },
            },
        ],
        phone_number_collection: {
            enabled: true,
        },
        line_items,
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/success`,
        cancel_url: `${YOUR_DOMAIN}/cart`,
    });
    res.send({ url: session.url });
}));
