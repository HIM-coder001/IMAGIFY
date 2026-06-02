import UserModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all the details'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            success: true,
            message: 'Account created successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


export const loginUser = async (req, res) => {
    try {
        const {email , password} = req.body

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:'Please fill in all the details'
            })
        }

        const user = await UserModel.findOne({ email })
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }

        const isMatch = await bcrypt.compare(password , user.password)
        if(isMatch){
            const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:15}
        )

        res.status(200).json({
            success:true,
            user:{
                id: user._id,
                name:user.name,
                email:user.email,
            },
            token
        })
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Invalid credentials"
            })
        }

    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}