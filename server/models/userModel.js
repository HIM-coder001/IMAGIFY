import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{ type:String , required:true, trim:true},
    email:{ type:String , required:true ,unique:true ,lowercase: true,},
    password:{ type:String , required:true , minlength: 6,},
    creditBalance:{ type:Number, default:5}   
},
{
    timestamps: true,
}
)

const UserModel = mongoose.models.user || mongoose.model("user" , userSchema)

export default UserModel;
