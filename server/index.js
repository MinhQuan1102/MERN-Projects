require('dotenv').config();

const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post');
const { use } = require('./routes/auth');


app.use(express.json())
app.use(cors())
app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)


const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://steaky37:suano2002@mern-learnit.k8iznpr.mongodb.net/mern-learnit?retryWrites=true&w=majority`
    )
    console.log('Connected to DB')
  } catch (error) {
    console.log(error)
  }
}

connectDB()




app.get('/', (req, res) => res.send("hello world"))
const PORT = 5000

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))