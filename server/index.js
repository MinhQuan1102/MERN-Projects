require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const hotelRouter = require('./routes/hotelRouter')
const roomRouter = require('./routes/roomRouter')
const userRouter = require('./routes/userRouter')
const authRouter = require('./routes/authRouter')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const port = 5000
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api/hotels', hotelRouter)
app.use('/api/rooms', roomRouter)
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('connected to db')
  } catch (error) {
    console.log(error)
  }
}

connectDB()

app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})