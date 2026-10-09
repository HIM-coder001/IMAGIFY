import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) => {
    const { token } = req.headers

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized. Please login.' })
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)

        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id
            next()
        } else {
            return res.status(401).json({ success: false, message: 'Not authorized. Please login.' })
        }

    } catch (error) {
        return res.status(401).json({ success: false, message: 'Session expired. Please login again.' })
    }
}

export default userAuth
