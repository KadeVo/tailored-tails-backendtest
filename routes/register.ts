import bcrypt from 'bcrypt'
import Joi from 'joi'
import express from 'express'
import { User } from '../schemas/user'
import generateAuthToken from '../utils/generateAuthToken'

const router = express.Router()

router.post('/', async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
  })
  const {error} = schema.validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  let user = await User.findOne({ email: req.body.email })
  if (user) return res.status(400).send('User Already Exists.')

  const { name, email, password } = req.body

  const hashedPassword = await bcrypt.hash(password, 10)
  user = new User({ 
    name, 
    email, 
    password: hashedPassword })

  await user.save()

  const token = generateAuthToken(user)

  res.send(token)
})

export {router as RegisterRouter}