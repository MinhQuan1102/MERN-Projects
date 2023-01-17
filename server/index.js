require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')

const authRouter = require('./routes/auth')
const userRouter = require('./routes/users')
const hotelRouter = require('./routes/hotels')
const roomRouter = require('./routes/rooms')

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/hotels', hotelRouter)
app.use('/api/rooms', roomRouter)

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || 'Something went wrong!'
  return res.status(500).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
  })
})

const PORT = 5000
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('connected to DB')
  } catch (error) {
    console.log(error)
  }
}

connectDB()
mongoose.connection.on('disconnected', () => console.log('mongoDB disconnected'))
mongoose.connection.on('connected', () => console.log('mongoDB connected'))

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))