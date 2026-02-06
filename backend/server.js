import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import connectDB from './config/mongodb.js'
import userRouter from './routes/UserRoutes.js'   // ✅ EXACT FILE NAME
import imageRouter from './routes/imageRoutes.js' // ✅ EXACT FILE NAME
const PORT = process.env.PORT || 4000
const app = express()

app.use(express.json())  

const allowedOrigins = [
  "http://localhost:5173",
 "https://image-generator-frontend-9sys.onrender.com"
]

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true)

    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true
}))

await connectDB()

app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)

app.get('/', (req, res) => res.send('API working'))

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT)
})




