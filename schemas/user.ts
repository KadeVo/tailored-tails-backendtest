import { Schema, model } from 'mongoose'
import { UserModel } from '../models/user'

const UserSchema = new Schema<UserModel>({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 200,
  },
  purchasedItems: [
    { type: Schema.Types.ObjectId, ref: 'product', default: [] },
  ],
})

export const User = model<UserModel>('user', UserSchema)
