import express from 'express'
import {asyncHandler} from '../utils/asyncHandler.js'
import {Apierror} from '../utils/Apierror.js'
import { user } from '../models/user.models.js';
import { uploadonCloudinary } from '../utils/UploadoneCloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import nodemailer from 'nodemailer'
import { VerifyEmail } from '../models/PendingEmailVerification.model.js';
import jwt from 'jsonwebtoken'
import { Otp } from '../models/Otp.model.js';
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
     user: process.env.EMAIL,
     pass: process.env.PASS,
    },
   });
const generateAcessRefreshToken= async(userId)=>{
    try {
        const currUser=await user.findById(userId);
        const AccessToken= await currUser.generateAccessToken();
        const RefreshToken= await currUser.generateRefreshToken();
       
      return {AccessToken,RefreshToken}

    } catch (error) {
        throw new Apierror(500,error);
    }
}
const RegisterEmail=asyncHandler(async(req,res)=>{
    
        const {email}=req.body;
        const existing=await user.findOne({email});
        // //console.log(existing)
        if(existing){
            throw new Apierror(400,"user with same email already exists")
        }
        // //console.log("ok")
        const newemail= await VerifyEmail.create({
            email:email,
            isverified:false
        })
       
        const token=await newemail.generateVerificationToken();
        if(!token){
            throw new Apierror(500,"could not generate token for verification")
        }
        //console.log(token);
        const url=`${process.env.SERVER_URL}/api/v1/users/verifyEmail/${token}`
        transporter.sendMail({
            to: email,
            subject: 'Verify Account',
            html: `Click <a href = '${url}'>here</a> to confirm your email.`
         })

        return res.status(200).json(
            new ApiResponse("verification link sent sucessfully",200,newemail)
        )
    

})
const RegisterUser=asyncHandler(async(req,res)=>{
    const {username,fullname,password,email}=req.body;
    // //console.log(req.body);
    if(!username || !fullname || !password || !email){
        throw new Apierror(400,"enter all the details");
    }
    if(!email.includes('@')){
        throw new Apierror(400,"please enter a valid email")
    }
    const existing=await user.findOne({
       email
    })
    
    if(existing){
        throw new Apierror(400,"user with the exact credentials already registerd")
    }
    const profilepath=req.file?.path;
   
    if(!profilepath){
        throw new Apierror(400,"please upload your Profile Picture")
    }
    const checkemail= await VerifyEmail.findOne({email});
    //console.log(checkemail)
    if(!checkemail){
        throw new Apierror(400,"Your Email has not been verified yet")
    }
    if(!checkemail.isverified){
        throw new Apierror(400,"Your Email has not been verified yet")
    }
    
    const profilepicc= await uploadonCloudinary(profilepath);
    if(!profilepicc){
        throw new Apierror(500,"something went wrong")
    }
    
   const newuser=await user.create({
        fullname:fullname,
        username:username,
        password:password,
        email:email,
        profilepic:profilepicc.url,
        isVerified:true
    })
   
    const checkuser= await  user.findById(newuser._id).select("-password -refreshToken")
    if(!checkuser){
      throw new Apierror(500,"user couldnt be added");
    }
    VerifyEmail.findByIdAndDelete(checkemail._id);
    return res.status(200).json(
        new ApiResponse("user added",200,checkuser)
    )
})
const LoginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email){
        throw new Apierror(400,"enter your email");
    }
    if(!password){
        throw new Apierror(400,"enter your password");
    }
    const checkuser= await user.findOne({email});
    if(!checkuser){
       
        throw new Apierror(400,"email is not registered");

    }
    if(checkuser.isVerified===false){
        throw new Apierror(400,"Please verify your email first")
    }
   const ress= await checkuser.isPasswordCorrect(password);
   if(!ress){
    throw new Apierror(400,"password is incorrect");
   }
   const {AccessToken,RefreshToken}= await generateAcessRefreshToken(checkuser._id);
   checkuser.refreshToken=RefreshToken;
   await  checkuser.save({validateBeforeSave:false})
   const loggedinuser=await user.findById(checkuser._id).select("-password -refreshToken");
   const options={
    httpOnly:true,
    secure:true,
    sameSite: 'None'
  }
  return res.status(200)
  .cookie("AcessToken",AccessToken,options)
  .cookie("RefreshToken",RefreshToken,options)
  .json(
    new ApiResponse("user logged in",200,{user:loggedinuser,AccessToken})
  )
})
const LogoutUser=asyncHandler(async(req,res,next)=>{
    await user.findByIdAndUpdate(req.user._id,{
        $set:{
            refreshToken:undefined
        }
    },
    {
        new:true
    }
)
const options={
    httpOnly:true,
    secure:true,
    sameSite: 'None'
  }
  return res.status(200)
  .clearCookie("AcessToken",options)
  .clearCookie("RefreshToken",options)
  .json(
    new ApiResponse("user logged out Sucessfully",200,{})
  )
})
const getUser=asyncHandler(async(req,res)=>{
    try {
    
        return res.status(200).json(
            new ApiResponse("user fetched Sucessfully",200,{
                user:req.user
            })
        )
    } catch (error) {
        return new Apierror(500,"something went wrong",error.message);
    }
})
const ChangeUsername=asyncHandler(async(req,res)=>{
   try {
     const loggedinuser=req.user._id;
     const newusername=req.body.username;
     if(!newusername){
         throw new Apierror(400,"username cannot be empty");
     }
     const curruser=await user.findByIdAndUpdate(loggedinuser,
         {
             $set:{
                 username:newusername
             }
         },
         {
             new:true
         }).select("-password -refreshToken")
         return res.status(200).json(
             new ApiResponse("username successfully changed",200,curruser)
         )
   } catch (error) {
    throw new Apierror(500,"something went wrong",error.messsage);
   }
})
const changeProfilePicture=asyncHandler(async(req,res)=>{
    try {
        const loggedinuser=req.user._id;
        const newProfilePic=req.file?.path;
        
        if(!newProfilePic){
            throw new Apierror(400,"Please upload your Proifle Picture")
        }
        const profilepath=await uploadonCloudinary(newProfilePic)
        if(!profilepath){
            throw new Apierror(500,"something went wrong")
        }
       
        const curruser= await user.findByIdAndUpdate(loggedinuser,
            {
                $set:{
                    profilepic:profilepath.url
                }
            },
            {
                new:true
            }).select("-password -refreshToken")
           
            if(!curruser){
                throw new Apierror(500,"could not change Profile Picture")
            }
            return res.status(500).json(
                new ApiResponse("user Profile Pic Successfully Updated",200,curruser)
            )
    } catch (error) {
        throw new Apierror(500,"something went wrong",error.message);
    }
})
const verifyEmail=asyncHandler(async(req,res)=>{
    try {
        const {token}=req.params;
        if(!token){
            throw new Apierror(500,"Token missing or expired");
        }
        
        const verifiedtoken=  jwt.verify(token,"sdfsjhjkghsjgnskgkjdgbdkjgljskgs")
        const verifieduser= await VerifyEmail.findById(verifiedtoken._id);
        //console.log("in email",verifieduser)
        if(!verifieduser){
          return   res.status(400).send({
                message:"verification link expired"
         } )
        }
        verifieduser.isverified=true;
        await verifieduser.save({validateBeforeSave:false});
        
        return res.status(200).send({
            message:"Congrats Account verified"
     } )
    } catch (error) {
        throw new Apierror(500,"something went wrong",error.message);
        
    }
})
const changePassword= asyncHandler(async(req,res,next)=>{
    try {
        const newpassword=req.body.newpassword;
        const oldpassword=req.body.oldpassword

        const loggedinuser=req.user._id;
        const curruser=await user.findById(loggedinuser);
      
       const isPasswordCorrect=await curruser.isPasswordCorrect(oldpassword);
       if(!isPasswordCorrect){
        throw new Apierror(400,"Please enter correct Password")
       }
      
       curruser.password=newpassword;
       await curruser.save({validateBeforeSave:false});
       
       curruser.refreshToken=undefined;
       await curruser.save({validateBeforeSave:false});
       const options={
        httpOnly:true,
        secure:true,
        sameSite: 'None'
      }
      return res.status(200)
      .clearCookie("AcessToken",options)
      .clearCookie("RefreshToken",options)
      .json(
        new ApiResponse("Password changed sucessfully and user logged out sucessfully",200,{})
      )

    } catch (error) {
        throw new Apierror(500,"something went wrong",error.message)
    }
})
const refreshAccessToken=asyncHandler(async(req,res)=>{
   
     const incomingRefreshToken=req.cookies.RefreshToken ;
    //  //console.log("refresh",incomingRefreshToken)
     if(!incomingRefreshToken){
         throw new Apierror(401,"Invalid Access")
     }
     const verifiedtoken=jwt.verify(
         incomingRefreshToken,
         "nhhjfkldhjkterklthjgdhgdjkhgjksdhgjkfsdhghgjklhaslknjglkhgkldhg"
     )
     const curruser= await user.findById(verifiedtoken?._id);
    //  //console.log("user",curruser);
     if(!curruser){
         throw new Apierror(401,"Invalid Access")
     }
     //console.log("incoming refrsh",incomingRefreshToken);
     //console.log("refresh in databse",curruser.refreshToken)
     const {AccessToken,RefreshToken}= await generateAcessRefreshToken(curruser._id);
     if(incomingRefreshToken!==curruser.refreshToken){
        throw new Apierror(200,"invali acess")
     }
     
     const updateuser=await user.findById(curruser._id).select('-password -refreshToken')
     const options={
        httpOnly:true,
        secure:true,
        sameSite: 'None'
      }
      return res.status(200)
      .cookie("AcessToken",AccessToken,options)
      .json(
        new ApiResponse("acess Token Refreshed",200,{AccessToken,user:updateuser})
      )
    
})
const ForgotPassword=asyncHandler(async(req,res)=>{
    const email=req.body.email;
    const currUser=await user.findOne({email});
    if(!currUser){
        throw new Apierror(400,"email is not registered")
    }
    
    const otp = Math.floor(100000 + Math.random() * 900000);
    const newotp= await Otp.create({
        email:email,
        Otp:otp
    })
    transporter.sendMail({
        to: email,
        subject: 'Your OTP CODE',
        text: `Your OTP code is: ${otp}`
     })
     return res.status(200).json(new ApiResponse("sent sucessfully",200,{}))
})
const VerifyOtp=asyncHandler(async(req,res)=>{
    const {email,otp}=req.body;
    const latestOtp = await Otp.findOne({ email }).sort({ createdAt: -1 }); 
    if(!latestOtp){
        throw new Apierror(402,"Otp has expired")
    }
     if(latestOtp.Otp!==otp){
        throw new Apierror(402,"Otp entered is wrong")
     }
     return res.status(200).json(
        new ApiResponse("otp sucessfully verified",200,{})
     )
      
})
const CreateNewPassword=asyncHandler(async(req,res)=>{
    try {
        const {password,email}=req.body;
        const currUser=await user.findOne({email});
        if(!currUser){
            throw new Apierror(401,"this Email does not exists")
        }
        currUser.password=password;
        currUser.refreshToken=undefined;
        await currUser.save({validateBeforeSave:false})
        const updateuser=await user.findById(currUser._id);
        return res.status(200)
        .json(
          new ApiResponse("Password changed sucessfully ",200,updateuser)
        )
        
    } catch (error) {
        throw new Apierror(500,error.message)
    }
})
const getRequestedUser=asyncHandler(async(req,res)=>{
     const {userdetail}=req.body;
     if(!userdetail){
        throw new Apierror(400,"userdetail can not be empty");
     }
     const getuser=await user.findOne({
        $or:[
            {
                fullname:userdetail
            },
            {
                username:userdetail
            }
        ]
            
     })
     if(!getuser){
        throw new Apierror(400,"user does not exist");
     }
     res.status(200).json(
        new ApiResponse("user found successfully",200,getuser)
     )
})
export {RegisterUser,LoginUser,LogoutUser,getUser,ChangeUsername,changeProfilePicture,verifyEmail,changePassword,refreshAccessToken,RegisterEmail,getRequestedUser,ForgotPassword,VerifyOtp,CreateNewPassword}