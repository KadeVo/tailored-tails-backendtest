import { UserModel } from '../models/user'
var jwt = require('jsonwebtoken')

const generateAuthToken = (user: UserModel) => {
  try {
    const tokenKey = process.env.JWT_KEY

    if (!tokenKey) {
      throw new Error('JWT_KEY is not defined')
    }

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      tokenKey
    )
    return token
  } catch (error) {
    console.error('Error generating auth token:', error)
    throw error
  }
}

export default generateAuthToken
