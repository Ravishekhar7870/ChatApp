import mongoose,{Schema} from "mongoose";
import jwt from 'jsonwebtoken'
const emailSchema=new Schema(
    {
        email:{
            type:String,
            required:true
        },
        isverified:{
            type:Boolean,
            default:false,
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
    emailSchema.methods.generateVerificationToken=function(){
        return jwt.sign(
            {
                _id:this._id
            },
            "sdfsjhjkghsjgnskgkjdgbdkjgljskgs",
            {
               expiresIn:"2h"
            }
        )
    }
    export const VerifyEmail=mongoose.model('VerifyEmail',emailSchema)