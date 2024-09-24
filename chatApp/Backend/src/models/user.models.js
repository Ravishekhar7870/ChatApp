import mongoose,{Schema} from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const userSchema=new Schema(
    {
        fullname:{
            type:String,
           
            required:true,
            trim:true
        },
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true
        },
        password:{
            type:String,
            required:[true,'password is required']
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true
        },
        profilepic:{
            type:String,
            required:true
            
        },
        isVerified:{
            type:Boolean,
            default:false
        },
        refreshToken:{
            type:String,
        }
    },
    {
        timestamps:true
    }
)
userSchema.pre('save',async function (next){
    if(!this.isModified('password')){
       return next();
    }
    this.password= await bcrypt.hash(this.password,10);
    next();
})
userSchema.methods.isPasswordCorrect=async function(password){
     return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken=function(){
   return jwt.sign(
       {
           username:this.username,
           email:this.email,
           fullname:this.fullname,
           _id:this._id,
       },
       process.env.ACCESS_TOKEN_SECRET,
       {
           expiresIn:"10s",
       })
}
userSchema.methods.generateRefreshToken=function(){
return jwt.sign(
   {
       _id:this._id
   },
   process.env.REFRESH_TOKEN_SECRET,
   {
       expiresIn:"10d"
   }
)
}

export const user=mongoose.model('user',userSchema);