import mongoose,{Schema} from "mongoose";
const OtpSchema=new Schema({
      email:{
        type:String,
        required:true
      },
      Otp:{
        type:String,
        required:true
      },
      createdAt:{
        type: Date,
        default: Date.now,
        expires: 300
    }
},
{
    timestamps:true
})
export const Otp=mongoose.model('Otp',OtpSchema)