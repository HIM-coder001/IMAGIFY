import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    prompt: { type: String, required: true },
    imageUrl: { type: String, required: true },
}, {
    timestamps: true,
})

const ImageModel = mongoose.models.image || mongoose.model('image', imageSchema)

export default ImageModel
