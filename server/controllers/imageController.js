import userModel from '../models/userModel.js'
import ImageModel from '../models/imageModel.js'
import FormData from 'form-data'
import axios from 'axios'

export const generateImage = async (req, res) => {
    try {
        const { userId, prompt } = req.body

        const user = await userModel.findById(userId)

        if (!user || !prompt) {
            return res.status(400).json({ success: false, message: 'Missing details' })
        }

        if (user.creditBalance <= 0) {
            return res.status(400).json({
                success: false,
                message: 'No Credit Balance',
                creditBalance: user.creditBalance
            })
        }

        const formData = new FormData()
        formData.append('prompt', prompt)

        const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: { 'x-api-key': process.env.CLIPDROP_API },
            responseType: 'arraybuffer'
        })

        const base64Image = Buffer.from(data, 'binary').toString('base64')
        const resultImage = `data:image/png;base64,${base64Image}`

        await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 })

        await ImageModel.create({ userId, prompt, imageUrl: resultImage })

        res.status(200).json({
            success: true,
            message: 'Image Generated',
            creditBalance: user.creditBalance - 1,
            resultImage
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const getUserGallery = async (req, res) => {
    try {
        const { userId } = req.body

        const images = await ImageModel.find({ userId })
            .sort({ createdAt: -1 })
            .limit(50)

        res.status(200).json({ success: true, images })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
