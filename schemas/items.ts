import mongoose from "mongoose"

const itemSchema = new mongoose.Schema({
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
})
const itemModel = mongoose.model('Item', itemSchema)

export default itemModel