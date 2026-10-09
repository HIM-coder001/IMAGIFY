import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'
import mpesaRoutes from './routes/mpesaRoutes.js'
import UserModel from './models/userModel.js'

const PORT = process.env.PORT || 4000
const app = express()

app.use(express.json())
app.use(cors())

await connectDB()

app.use("/api/user", userRouter)
app.use("/api/image", imageRouter)
app.use("/api/mpesa", mpesaRoutes)

app.get("/", (req, res) => {
    res.send("API Working!")
})

// One-time migration: bump all accounts below 100 credits up to 100
// Protected by a secret key in the query string — remove this route after running
app.post("/api/admin/migrate-credits", async (req, res) => {
    if (req.headers['x-admin-key'] !== process.env.ADMIN_KEY) {
        return res.status(403).json({ success: false, message: 'Forbidden' })
    }
    try {
        const result = await UserModel.updateMany(
            { creditBalance: { $lt: 100 } },
            { $set: { creditBalance: 100 } }
        )
        res.json({
            success: true,
            message: `Updated ${result.modifiedCount} account(s) to 100 credits`
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})