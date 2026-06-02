import mongoose from "mongoose";

const connectDB = async () => {
    try {
         mongoose.connection.on('connected' , () => {
        console.log("Database Connected")
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/imagify`)
    } catch (error) {
        console.log("MongoDB connection error:" ,error)
        
    }

   
}

export default connectDB