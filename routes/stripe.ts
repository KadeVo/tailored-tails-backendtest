import express from 'express'
import Stripe from 'stripe'
import * as dotenv from 'dotenv'
dotenv.config()

const stripeKey = process.env.STRIPE_KEY
if (!stripeKey) {
  throw new Error('Stripe key not provided')
}
const stripe = new Stripe(stripeKey)
const router = express.Router()

const YOUR_DOMAIN = 'http://localhost:5173'

router.post('/create-checkout-session', async (req, res) => {
  const line_items = req.body.cartItems.map((item: any) => {
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
    }
  })
  const session = await stripe.checkout.sessions.create({
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
  })
  res.send({ url: session.url })
  
})

export { router as StripeRouter }
