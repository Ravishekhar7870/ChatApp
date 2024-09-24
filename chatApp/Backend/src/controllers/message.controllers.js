import express from 'express'
import { ApiResponse } from '../utils/ApiResponse.js'
import { Apierror } from '../utils/Apierror.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { user } from '../models/user.models.js'
import { Message } from '../models/message.model.js'
import { conversation} from '../models/conversation.model.js'
import { uploadMultionCloudinary} from '../utils/UploadoneCloudinary.js'
import { EmitEvent } from '../utils/Emit.js'
import { NEW_MESSAGE } from '../Constant/Event.js'
import { NEW_MESSAGE_ALERT } from '../Constant/Event.js'
import mongoose from 'mongoose'
const sendAttachment=asyncHandler(async(req,res)=>{
   const {chatid}=req.body;
   const files=req.files || [];
   const loggedinuser=req.user
  const currChat=await conversation.findById(chatid);
  if(!currChat){
    throw new Apierror(400,"this chat doesnt exist");
  }
  if(!currChat.participants.includes(loggedinuser._id)){
    throw new Apierror(400,"you can not send this message in current conversation")
  }
  if(files.length<1){
    throw new Apierror(400,"Please send Attachments")
  }
  //upload on cloudinary
  const  attachments=await uploadMultionCloudinary(files);
  const MessageforRealTime={
    content:"",
    attachments,
    sender:{ _id:loggedinuser._id,
      fullname:loggedinuser._fullname,
      profilepic:loggedinuser.profilepic
     },
    chat:currChat._id,
     createdAt: new Date().toISOString()
  };
  const MessageforDB={
    content:"",
    senderId:loggedinuser?._id,
    conversationId:currChat?._id,
    attachments:attachments
  }
  const newmessage=await Message.create(MessageforDB);
  EmitEvent(req,NEW_MESSAGE,currChat.participants,{
    message:MessageforRealTime,
    chatId:currChat._id
  })
  EmitEvent(req,NEW_MESSAGE_ALERT,currChat.participants,{chatid:currChat._id})
  return res.status(200).json(
    new ApiResponse("attachment send successfully",200,newmessage)
  )
  
})
const getMessages=asyncHandler(async(req,res)=>{
  
     const convId=req.params.id;
     if(!convId){
       throw new Apierror(200,"conid required")
     }
     const conversationId= new mongoose.Types.ObjectId(convId);
     const {page=1}=req.query
     const MessagePerPage=9;
     const skipNum=(page-1)*MessagePerPage;
     const pipeline1=
      [
       {
        $match:{
          "conversationId":conversationId
        }
       },
       {
        $lookup:{
          from:"users",
          localField:"senderId",
          foreignField:"_id",
          as:"sender"
        }
       },
       {
        $addFields: {
          sender:{
            $arrayElemAt:["$sender",0]
          }
        }
      },
      {
        $sort: {
          "createdAt" : -1
         }
      },
      {
        $skip:skipNum
      },
      {
        $limit:MessagePerPage
      },
      {
        $sort:{
          "createdAt":1
        }
       }
      ];
      const pipeline2=[
        {
          $match:{
            "conversationId":conversationId
          }
         },
         {
          $count:'totalMessage'
         }
      ]
      const [messages,totalMessage]=await Promise.all([
        Message.aggregate(pipeline1),
        Message.aggregate(pipeline2)
      ])
     
  
     const totalPages=Math.ceil(totalMessage.length>=1 && totalMessage[0].totalMessage/MessagePerPage);
     //console.log(page);
     return res.status(200).json(
      new ApiResponse("fetched succesfully",200,{messages,totalMessage,totalPages})
     )
})
export {sendAttachment,getMessages}